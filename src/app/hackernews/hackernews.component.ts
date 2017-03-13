import { Component, OnInit } from '@angular/core'

import { HackerNews } from './hackernews';
import { HackerNewsService } from './hackernews.service';

import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'hacker-news',
  template:
    `
    <div class="section container-fluid">
          
      <div class="row col-md-12 hn-panel">          
        <button type="button" class="btn btn-default btn-xs" (click)="markAllAsRead($event)">
          Mark all as read            
        </button>
        <button type="button" class="btn btn-default btn-xs" (click)="markAllAsReadOlderOneDay($event)">
          Mark as read items older than a day            
        </button>
      </div>
          
      <div id="news-table" class="row col-md-12" (window:keydown)="keyEvent($event)">
        <div *ngFor="let i of items">
          <div class="item-element">
            <div class="first-line">
              <a href="{{i.Url}}">{{i.Title}}</a> 
            </div>
            <div class="second-line">
              ({{i.Time | stringdate | cleandate }}) [<a href="https://news.ycombinator.com/item?id={{i.Id}}">{{i.Type}}</a> with {{i.Score}}] (<a href="#" (click)="markAsRead($event, i)">mark-as-read</a>)
            </div>            
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`                   
    .section { 
      margin-top: 15px;
      margin-left: 20px;
      margin-right: 20px;
    }     
    div#news-table { 
        margin-top: 10px;       
        line-height: 1.1;
      }    
      .item-element {
        margin-bottom: 5px;
      }
      .second-line { 
        color: #777; 
        font-size: 13px;
       }
      .second-line a {
        color: #777;
      }                                           
      a { font-size: 13px; }
`],
  providers: [HackerNewsService]
})

export class HackerNewsComponent {

  items: HackerNews[] = [];

  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit(): void {
    this.hackerNewsService.getNews().then(news => this.items = news);
  }

  markHackerNewsAsRead(item: HackerNews) {
    this.hackerNewsService.markNewsAsReaded(item.Id);
    this.items = _.filter(this.items, function(n: HackerNews) { return n.Id != item.Id });
  }

  markAsRead(e: MouseEvent, item: HackerNews) {
    this.markHackerNewsAsRead(item);
    e.preventDefault();
  }

  markAllAsReadOlderOneDay(e: MouseEvent): void {

    let moment = Math.round((new Date().getTime()) / 1000) - 24 * 60 * 60;
    this.items = _.filter(this.items, function(n: HackerNews) { return n.Time >= moment });
    this.hackerNewsService.markNewsAsReadedFromTime(moment);
  }

  markAllAsRead(e: MouseEvent): void {
    this.items = [];
    this.hackerNewsService.markAllNewsAsReaded();
  }

  keyEvent(data: any):void {

    switch (data.key) {
      case "j":
        if (this.items.length > 0)
          this.markHackerNewsAsRead(this.items[0]);
        break;
    }
  }
}
