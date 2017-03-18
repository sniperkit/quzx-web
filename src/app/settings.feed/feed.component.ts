import { Component, OnInit } from '@angular/core'

import { RssFeed, RssItem } from '../rss/rss';
import { RssService } from '../rss/rss.service';

import * as _ from 'underscore';
import {ActivatedRoute} from "@angular/router";

enum Mode {
  Update,
  Insert
}

@Component({
  moduleId: module.id,
  selector: 'feed',
  template:
    `
    <div class="feed-section container-fluid">
      <div id="feed-form" class="row col-md-6 col-md-offset-3">                              
        <form #feedForm="ngForm" (ngSubmit)="insertOrUpdateFeed(feedForm.value)">
          <div class="form-group">
            <label for="feed-id">Id: </label>
            <input [(ngModel)]="feed.Id" name="Id" id="feed-id" class="form-control" type="text" />
          </div>
          <div class="form-group">
            <label for="feed-title">Title: </label>
            <input [(ngModel)]="feed.Title" name="Title" id="feed-title" class="form-control"  type="text" disabled />
          </div>
          <div class="form-group">
            <label for="feed-link">Link: </label>
            <input [(ngModel)]="feed.Link" name="Link" id="feed-link" class="form-control"  type="text" />
          </div>
          <div class="form-group">
            <label for="feed-lastsynctime">LastSyncTime: </label>
            <input [(ngModel)]="feed.LastSyncTime" name="LastSyncTime" id="feed-lastsynctime" class="form-control"  type="text" />
          </div>
          <div class="form-group">
            <label for="feed-syncinterval">SyncInterval: </label>
            <input [(ngModel)]="feed.syncInterval" name="SyncInterval" id="feed-syncinterval" class="form-control"  type="text" />
          </div>
          <div class="form-group">
            <label for="feed-alternativename">AlternativeName: </label>
            <input [(ngModel)]="feed.AlternativeName" name="AlternativeName" id="feed-alternativename" class="form-control"  type="text" />
          </div>
          <div class="form-group">
            <label for="feed-rsstype">Тип: </label>
            <select [(ngModel)]="feed.RssType" name="RssType" id="feed-rsstype" class="form-control">             
              <option [ngValue]=1>RSS</option>
              <option [ngValue]=2>VK</option>
              <option [ngValue]=3>Reddit</option>
              <option [ngValue]=4>YouTube</option>
              <option [ngValue]=5>Torrent</option>
              <option [ngValue]=6>LJ</option>
            </select>           
          </div>
          <div class="form-group">
            <label for="feed-showcontent">Показывать содержимое: </label>
            <select [(ngModel)]="feed.ShowContent" name="ShowContent" id="feed-showcontent" class="form-control">
              <option [ngValue]=0>Нет</option>
              <option [ngValue]=1>Да</option>
            </select>            
          </div>
          <div class="form-group">
            <label for="feed-showorder">Порядок новостей: </label>
            <select [(ngModel)]="feed.ShowOrder" name="ShowOrder" id="feed-showorder" class="form-control">
              <option [ngValue]=0>Дата (возрастание)</option>
              <option [ngValue]=1>Дата (убывание)</option>
            </select>            
          </div>
          <div class="form-group">
            <label for="feed-folder">Каталог: </label>
            <input [(ngModel)]="feed.Folder" name="Folder" id="feed-folder" class="form-control"  type="text" />
          </div>
          <button type="submit" class="btn btn-default">Save</button>
        </form>
      </div>
    </div>
  `,
  styles: [`                             
    #feed-form {
      margin-top: 30px;
    }                            
  `],
  providers: [RssService]
})

export class FeedComponent {

  feed: RssFeed = new RssFeed();
  mode: Mode = Mode.Update;

  constructor(private rssService: RssService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.params['id']);

    if (id !== 0) {
      this.rssService.getFeed(id).then(feed => {
        this.feed = feed;
        this.mode = Mode.Update;
      });
    } else {
        this.feed = new RssFeed();
        this.mode = Mode.Insert;
    }
  }

  insertOrUpdateFeed(feed: RssFeed) {

    console.log(feed);

    if (this.mode == Mode.Update) {

      this.rssService.putFeed(feed);
    } else if (this.mode == Mode.Insert) {

      feed.SyncInterval = parseInt(feed.SyncInterval);
      feed.LastSyncTime = 0;
      feed.LimitFull = 10;
      feed.LimitHeadersOnly = 30;
      feed.Broken = 0;
      this.rssService.postFeed(feed);
    }
  }
}

