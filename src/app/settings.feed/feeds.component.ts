import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { RssFeed, RssItem } from '../rss/models/rss';
import { RssService } from '../rss/services/rss.service';

import * as _ from 'underscore';
import {ActivatedRoute, Router} from '@angular/router';
import {GET_FEEDS, SET_NAME_FILTER, SettingsFeedState} from './actions/settings.feed.actions';

@Component({
  moduleId: module.id,
  selector: 'feeds',
  templateUrl: 'feeds.component.html',
  styleUrls: ['feeds.component.css'],
  providers: [RssService]
})

export class FeedsComponent {

  state: SettingsFeedState;

  constructor(private store: Store<SettingsFeedState>,
              private rssService: RssService,
              private router: Router) {

    store.select('settingsFeedReducer').subscribe((data: SettingsFeedState) =>  {

      this.state = data;
      console.log(this.state);
    });
  }

  ngOnInit(): void {

    this.rssService.getAllFeeds().then(feeds => {
      this.store.dispatch({type: GET_FEEDS, payload: feeds});
    });
  }

  feedsByType(t: number): RssFeed[] {
    return _.filter(this.state.feedsToDisplay, function(f: RssFeed) { return f.RssType === t; });
  }

  subscribe() {
    this.router.navigate(['feeds/0']);
  }

  onNameFilter(name: string) {
    this.store.dispatch({type: SET_NAME_FILTER, payload: name});
  }

}

