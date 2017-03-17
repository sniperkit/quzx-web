import { Component, OnInit } from '@angular/core'

import { RssFeed, RssItem } from '../rss/rss';
import { RssService } from '../rss/rss.service';

import * as _ from 'underscore';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'feeds',
  template:
    `
    <div class="feed-section container-fluid">
            
        <div class="row col-md-12 feed-panel">          
          <button type="button" class="btn btn-default btn-xs" (click)="subscribe()">
            Subscribe            
          </button>
          <input type="text" id="feed-search">
        </div>            
            
        <div *ngFor="let feedType of feedTypes" class="row col-md-12">

          <div class="row col-md-12">{{feedType}}</div>                    
                    
          <div *ngFor="let feed of feedsByType(feedType)" class="row col-md-12">
            <a [routerLink]="['/feeds', feed.Id]" [ngClass]="{'broken': feed.Broken == 1}">{{feed.Title}}</a>
          </div>
        </div>                       
    </div>
  `,
  styles: [`              
                   
    a { font-size: 13px; }
                       
    .feed-section {    
       margin-top: 4px;
       margin-left: 30px;
       margin-right: 30px;
       font-size: 13px;
    }
    
    .feed-panel {
      margin-top: 6px;
      margin-bottom: 6px;
    }
    
    a.broken { color: red; }
         
`],
  providers: [RssService]
})

export class FeedsComponent {

  feeds: RssFeed[];
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
    });
  }

  feedsByType(t: number): RssFeed[] {
    return _.filter(this.feeds, function(f: RssFeed) { return f.RssType == t; });
  }

  subscribe() {
    this.router.navigate(['feeds/0'])
  }

}

