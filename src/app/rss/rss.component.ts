import {Component, OnInit, ViewChild} from '@angular/core'
import {Store, provideStore } from '@ngrx/store';
import { AppState, INCREMENT, DECREMENT, GET_FEEDS } from '../actions/rss'

import { RssFeed, RssItem } from './rss';
import { RssService } from './rss.service';

import * as _ from 'underscore';
import {ActivatedRoute} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Tag} from "../tags/tags";
import {TagsService} from "../tags/tags.service";
import {RenameFeedModalWindowComponent} from "../common/components/renamefeed-modalwindow.component";
import {Observable} from "rxjs";


@Component({
  moduleId: module.id,
  selector: 'rss',
  templateUrl: 'rss.component.html',
  styleUrls: ['rss.component.css'],
  providers: [RssService, TagsService]
})

export class RssComponent {

  @ViewChild('renamefeedmodal') renameFeedModal: RenameFeedModalWindowComponent;

  state: AppState;

  feedType: number = 0;
  showContent: boolean = true;
  feeds: RssFeed[];
  items: RssItem[] = [];
  selectedFeed: RssFeed;
  folders: string[] = [];
  tags: Tag[] = [];
  source: string = "rss";

  constructor(private store: Store<AppState>,
              private rssService: RssService,
              private tagsService: TagsService,
              private route: ActivatedRoute) {

    store.select('feedsReducer').subscribe((data: AppState) => this.state = data );

    route.data.subscribe((d: any) => {
      this.feedType = d.section;
    });

    this.tagsService.getTags().then(tags => {
      this.tags = tags;
    });
  }

  addDemoData() {
    console.log('hello');
    console.log(this.state);
    this.store.dispatch({type: INCREMENT})
  }

  removeDemoData() {
    this.store.dispatch({type: DECREMENT})
  }

  ngOnInit(): void {
    this.rssService.getUnreadFeeds(this.feedType).then(feeds => {
      this.feeds = feeds;
      this.store.dispatch({type: GET_FEEDS, payload: feeds});
      this.folders = _.chain(this.feeds)
                      .map(function(f: RssFeed) { return f.Folder; })
                      .uniq().value();
    });
  }

  onFeedSelected(feed: RssFeed) {

    this.selectedFeed = feed;
    this.showContent = this.selectedFeed.ShowContent == 1;

    this.rssService.getRssItems(this.selectedFeed.Id).then(items => {
      this.items = items;
    });
  }

  showModal(): void {
    this.renameFeedModal.show();
  }

  onChangeShowContent(): void {

    this.showContent = !this.showContent;
    this.selectedFeed.ShowContent = this.showContent ? 1 : 0;
    this.updateAndReloadFeed(this.selectedFeed);
  }

  updateAndReloadFeed(feed: RssFeed): void {
    this.rssService.putFeed(feed).then(r => {
      this.rssService.getRssItems(feed.Id).then(items => {
        this.items = items;
      });
    });
  }

  updateFeed(feed: RssFeed): void {
    feed.SyncInterval = parseInt(feed.SyncInterval);
    this.rssService.putFeed(feed);
  }

  onSortByNewest(): void {

    this.selectedFeed.ShowOrder = 0;
    this.updateAndReloadFeed(this.selectedFeed);
  }

  onSortByOldest(): void {

    this.selectedFeed.ShowOrder = 1;
    this.updateAndReloadFeed(this.selectedFeed);
  }

  readAll(): void {

    var feed_id = this.selectedFeed.Id;
    this.rssService.markRssFeedAsReaded(feed_id);
    this.items = [];
    this.feeds = _.chain(this.feeds)
                  .filter(function(f: RssFeed) { return f.Id !== feed_id }).value();
  }

  markAsReadedAndDeleteItem(item: RssItem) {

    this.rssService.markRssItemAsReaded(item.Id);
    this.items = _.filter(this.items, function(q: RssItem) { return q.Id != item.Id });
    this.feeds = _.chain(this.feeds)
      .each(function(r: RssFeed) { if (r.Id == item.FeedId) r.Unreaded--; })
      .filter(function(r: RssFeed) { return r.Unreaded > 0 }).value();
  }

  keyEvent(data: any):void {

    switch (data.key) {
      case "j":

        // mark as read
        if (this.items.length > 0)
          this.markAsReadedAndDeleteItem(this.items[0]);

        // fetch new items
        if (this.items.length == 0) {
          this.rssService.getRssItems(this.selectedFeed.Id).then(items => {
            this.items = items;
          });
        }

        break;
    }
  }

  markAsRead(e: MouseEvent, item: RssItem) {

    this.markAsReadedAndDeleteItem(item);
    e.preventDefault();
  }

  unsubscribe() {

    var feed_id = this.selectedFeed.Id;
    this.rssService.unsubscribe(feed_id);
    this.items = [];
    this.feeds = _.chain(this.feeds)
      .filter(function(f: RssFeed) { return f.Id !== feed_id }).value();
  }
}

