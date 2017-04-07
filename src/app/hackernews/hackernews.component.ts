import { Component, OnInit } from '@angular/core'

import { HackerNews } from './hackernews';
import { HackerNewsService } from './hackernews.service';

import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'hacker-news',
  templateUrl: 'hackernews.component.html',
  styleUrls: ['hackernews.component.css'],
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
