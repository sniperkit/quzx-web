import {Component, OnInit } from '@angular/core'
import {Tweet} from "./tweet";
import {TweetService} from "./tweet-service";

import * as _ from 'underscore';


@Component({
  moduleId: module.id,
  selector: 'twitter',
  template:
    `
      <div class="twi-section container-fluid">        
        <div *ngFor="let tweet of tweets" class="twi">
          <div class="twi-text" [innerHTML]="tweet.text | tweettext"></div>
          <div class="twi-second-line">
            [{{tweet.user.name}}] ({{tweet.created_at | cleandate }}) (<a href="#" (click)="markAsRead($event, tweet.id_str)">delete</a>)
          </div>
        </div>
      </div>      
    `,
  styles: [`
              .twi-section { 
                margin-top: 15px;  
                margin-left: 20px;
                margin-right: 20px;
              }               
              a {
                font-size: 13px;
              }
              .twi {
                 font-size: 13px;
                 margin-bottom: 5px;
              }
              .twi-second-line {
                 color: #777;
              }
          `],
  providers: [TweetService]
})

export class TwitterComponent {

  tweets: Tweet[];

  constructor(private tweetService: TweetService) { }

  getTweets(): void {
    this.tweetService.getTweets("meditat0r").then(tweets => this.tweets = tweets);
  }

  markAsRead(e: MouseEvent, id: string) {
    this.tweetService.unfavorite(id);
    this.tweets = _.filter(this.tweets, function(t: Tweet) { return t.id_str != id });
    e.preventDefault();
  }

  ngOnInit(): void {
    this.getTweets();
  }

}
