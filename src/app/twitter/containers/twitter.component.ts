import {Component, OnInit } from '@angular/core'
import {Tweet} from "../models/tweet";
import {TweetService} from "../services/tweet-service";

import * as _ from 'underscore';

@Component({
  moduleId: module.id,
  selector: 'twitter',
  templateUrl: 'twitter.component.html',
  styleUrls: ['twitter.component.css'],
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
