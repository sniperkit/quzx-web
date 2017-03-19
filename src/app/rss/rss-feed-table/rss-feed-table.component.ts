import { Component, OnInit } from '@angular/core';
import {RssItem, RssFeed} from "../rss";
import {RssService} from "../rss.service";

import {Store } from '@ngrx/store';
import { AppState, GET_FEEDS, GET_FEED_ITEMS } from '../../actions/rss'

import * as _ from 'underscore';

@Component({
  selector: 'rss-feed-table',
  templateUrl: './rss-feed-table.component.html',
  styleUrls: ['./rss-feed-table.component.css']
})
export class RssFeedTableComponent implements OnInit {

  state: AppState;
  selectedFeed: RssFeed;

  constructor(private store: Store<AppState>,
             private rssService: RssService) {

    store.select('feedsReducer').subscribe((data: AppState) => {
      this.state = data;
    });
  }

  ngOnInit() {
  }

  onFeedSelected(feed: RssFeed) {

    this.selectedFeed = feed;
    this.state.showContent = feed.ShowContent == 1;

    this.rssService.getRssItems(feed.Id).then(items => {
      this.store.dispatch({type: GET_FEED_ITEMS, payload: items});
    })
  }

  markAsReadedAndDeleteItem(item: RssItem) {

    this.rssService.markRssItemAsReaded(item.Id);

    this.store.dispatch({type: GET_FEED_ITEMS,
      payload: _.filter(this.state.rssItems, function(q: RssItem) { return q.Id != item.Id })});

    this.store.dispatch({type: GET_FEEDS,
      payload: _.chain(this.state.feeds)
                .each(function(r: RssFeed) { if (r.Id == item.FeedId) r.Unreaded--; })
                .filter(function(r: RssFeed) { return r.Unreaded > 0 }).value()});
  }

  markAsRead(e: MouseEvent, item: RssItem) {

    this.markAsReadedAndDeleteItem(item);
    e.preventDefault();
  }

  keyEvent(data: any): void {

    switch (data.key) {
      case "j":

        // mark as read
        if (this.state.rssItems.length > 0)
          this.markAsReadedAndDeleteItem(this.state.rssItems[0]);


        // fetch new items
        if (this.state.rssItems.length == 0) {
          this.rssService.getRssItems(this.selectedFeed.Id).then(items => {
            this.store.dispatch({type: GET_FEED_ITEMS, payload: items});
          });
        }
        break;
    }
  }
}
