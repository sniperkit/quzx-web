import {Component, OnInit, ViewChild} from '@angular/core'
import {Store } from '@ngrx/store';
import { AppState, GET_FEED_ITEMS, GET_FEEDS, CLEAR_FEED_ITEMS, REMOVE_FEED, SET_SHOW_CONTENT, GET_RSS_TAGS } from '../actions/rss'

import { RssFeed } from './rss';
import { RssService } from './rss.service';

import {ActivatedRoute} from "@angular/router";
import {Tag} from "../tags/tags";
import {TagsService} from "../tags/tags.service";
import {RenameFeedModalWindowComponent} from "../common/components/renamefeed-modalwindow.component";
import {RssFeedTableComponent} from "./rss-feed-table/rss-feed-table.component";


@Component({
  moduleId: module.id,
  selector: 'rss',
  templateUrl: 'rss.component.html',
  styleUrls: ['rss.component.css'],
  providers: [RssService, TagsService]
})

export class RssComponent {

  @ViewChild('renamefeedmodal') renameFeedModal: RenameFeedModalWindowComponent;
  @ViewChild('feedtable') feedTable: RssFeedTableComponent;

  state: AppState;
  feedType: number = 0;
  selectedFeed: RssFeed;

  constructor(private store: Store<AppState>,
              private rssService: RssService,
              private tagsService: TagsService,
              private route: ActivatedRoute) {

    store.select('feedsReducer').subscribe((data: AppState) => this.state = data );

    route.data.subscribe((d: any) => {
      this.feedType = d.section;
    });

    this.tagsService.getTags().then(tags => {
      this.store.dispatch({type: GET_RSS_TAGS, payload: tags});
    });
  }

  ngOnInit(): void {
    this.rssService.getUnreadFeeds(this.feedType).then(feeds => {
      this.store.dispatch({type: GET_FEEDS, payload: feeds});
    });
  }

  onFeedSelected(feed: RssFeed) {

    this.selectedFeed = feed;
    this.feedTable.onFeedSelected(feed);
  }

  showModal(): void {
    this.renameFeedModal.show();
  }

  onChangeShowContent(): void {

    let showContent = !this.state.showContent;
    this.store.dispatch({type: SET_SHOW_CONTENT, payload: showContent});
    this.selectedFeed.ShowContent = showContent ? 1 : 0;
    this.updateAndReloadFeed(this.selectedFeed);
  }

  updateAndReloadFeed(feed: RssFeed): void {
    this.rssService.putFeed(feed).then(r => {
      this.rssService.getRssItems(feed.Id).then(items => {
        this.store.dispatch({type: GET_FEED_ITEMS, payload: items});
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

    let feed_id = this.selectedFeed.Id;
    this.rssService.markRssFeedAsReaded(feed_id);
    this.store.dispatch({type: CLEAR_FEED_ITEMS});
    this.store.dispatch({type: REMOVE_FEED, payload: feed_id});
  }

  unsubscribe() {

    let feed_id = this.selectedFeed.Id;
    this.rssService.unsubscribe(feed_id);
    this.store.dispatch({type: CLEAR_FEED_ITEMS});
    this.store.dispatch({type: REMOVE_FEED, payload: feed_id});
  }
}

