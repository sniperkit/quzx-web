import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {Store, provideStore } from '@ngrx/store';
import { AppState, GET_FEEDS } from '../../actions/rss'
import {RssFeed} from "../../models/rss";

import * as _ from 'underscore';

@Component({
  selector: 'rss-feed-list',
  templateUrl: 'rss-feed-list.component.html',
  styleUrls: ['rss-feed-list.component.css']
})
export class RssFeedListComponent implements OnInit {

  @Output() onFeedSelected = new EventEmitter();
  state: AppState;

  constructor(private store: Store<AppState>) {

    store.select('feedsReducer').subscribe((data: AppState) => this.state = data );
  }

  ngOnInit() {
  }

  feedsByFolder(folder: string): RssFeed[] {
    return _.filter(this.state.feeds, function(f: RssFeed) { return f.Folder == folder; });
  }

  onSelectFeed(e: MouseEvent, feed: RssFeed) {

    e.preventDefault();
    this.onFeedSelected.emit(feed);
  }
}
