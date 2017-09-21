import { Component, OnInit } from '@angular/core';

import { RssFeed, RssItem } from '../rss/models/rss';
import { RssService } from '../rss/services/rss.service';

import * as _ from 'underscore';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'feeds',
  templateUrl: 'feeds.component.html',
  styleUrls: ['feeds.component.css'],
  providers: [RssService]
})

export class FeedsComponent {

  feeds: RssFeed[];
  feedsToDisplay: RssFeed[];
  feedTypes: number[];

  constructor(private rssService: RssService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.rssService.getAllFeeds().then(feeds => {

      this.feeds = feeds;
      this.feedTypes = _.chain(this.feeds)
                        .map(function(f: RssFeed) { return f.RssType; })
                        .uniq().value();
      this.feedsToDisplay = this.feeds;
    });
  }

  feedsByType(t: number): RssFeed[] {
    return _.filter(this.feedsToDisplay, function(f: RssFeed) { return f.RssType == t; });
  }

  subscribe() {
    this.router.navigate(['feeds/0']);
  }

  onFilter(s: string) {

    if (s.length > 0) {
      this.feedsToDisplay = _.filter(this.feeds, function(f: RssFeed) { return f.AlternativeName.indexOf(s) > -1; });
    } else {
      this.feedsToDisplay = this.feeds;
    }

  }

}

