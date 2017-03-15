import {Component, OnInit, ViewChild} from '@angular/core'

import { RssFeed, RssItem } from './rss';
import { RssService } from './rss.service';

import * as _ from 'underscore';
import {ActivatedRoute} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Tag} from "../tags/tags";
import {TagsService} from "../tags/tags.service";
import {RenameFeedModalWindowComponent} from "../common/components/renamefeed-modalwindow.component";

@Component({
  moduleId: module.id,
  selector: 'rss',
  template:
    `
    <div class="vk-section container-fluid">
            
        <div class="row">
        
          <!-- list of feeds -->
          <div class="col-md-2 feed-list">  
            <div *ngFor="let folder of folders">
              <div class="feed-folder">{{folder}}</div>
              
              <div *ngFor="let feed of feedsByFolder(folder)">
                <a href="#" (click)="onFeedSelected($event, feed)">{{feed.AlternativeName}} ({{feed.Unreaded}})</a>
              </div>
            </div>
          </div>
          
          <div class="col-md-10">
          
            <div class="row col-md-12 rss-panel"> 
              
              <div class="btn-group" dropdown>
                <button type="button" class="btn btn-default btn-xs dropdown-toggle" dropdownToggle>
                  Display
                  <span class="caret"></span>
                </button>
                <ul dropdownMenu role="menu" aria-labelledby="single-button" class="dropdown-menu-right">
                  <li role="menuitem"><a href="#" (click)="onChangeShowContent($event)">Show content</a></li>
                  <li role="menuitem"><a href="#" (click)="onSortByNewest($event)">Sort by newest</a></li>
                  <li role="menuitem"><a href="#" (click)="onSortByOldest($event)">Sort by oldest</a></li>                  
                </ul>
              </div>
              
              <div class="btn-group" dropdown>
                <button type="button" class="btn btn-default btn-xs dropdown-toggle" dropdownToggle>
                  Action
                  <span class="caret"></span>
                </button>
                <ul dropdownMenu role="menu" aria-labelledby="single-button" class="dropdown-menu-right">
                  <li role="menuitem"><a href="#" (click)="showModal($event)">Edit</a></li>
                  <li role="menuitem"><a href="#" (click)="unsubscribe($event)">Unsubscribe</a></li>
                </ul>
              </div>
              
              <button type="button" class="btn btn-default btn-xs" (click)="readAll($event)">
                Mark all as read            
              </button>
            </div>
                                  
            <div id="rss-table" class="row col-md-12" (window:keydown)="keyEvent($event)">
              <div *ngFor="let i of items">
                <div class="rss-element" [ngClass]="{ 'rss-element-dotted' : showContent}">
                  <div class="first-line">
                    <a href="{{i.Link}}" [ngClass]="{ 'first-line-big' : showContent}">{{i.Title}}</a> 
                                        
                    <tag-select [tags]="tags" [itemId]="i.Id" [source]="source" class="tag-select pull-right"></tag-select>  
                                        
                  </div>
                  <div class="second-line">
                    ({{i.Date | stringdate | cleandate }}) (<a href="#" (click)="markAsRead($event, i)">mark-as-read</a>)
                  </div>
                  <div *ngIf="showContent" class="content" [innerHTML]="i.Content"></div>
                </div>
              </div>
            </div>        
          </div>      
        </div>
                                
      <!-- Modal windows -->                 
      <renamefeed-modalwindow #renamefeedmodal [selectedFeed]="selectedFeed" (onFeedWasModified)="updateFeed($event)"></renamefeed-modalwindow>                       
    </div>
  `,
  styles: [`              
                   
    a { font-size: 13px; }                   
    .vk-section {        
       margin-left: 10px;
       margin-right: 10px;
    }
    .feed-list {
      margin-top: 30px;
    }
    .feed-folder {
      margin-top: 6px;
      margin-bottom: 6px;
      font-size: 13px;
    }
    .rss-panel {
       margin-top: 8px;
       margin-bottom: 8px;       
    }
        
    div#rss-table {        
      line-height: 1.1;
    }  
      
    .rss-element-dotted {
      border: 1px dotted #bbb;
    }
      
    .rss-element {
      margin-bottom: 8px;      
    }
    
    .first-line {
      margin-left: 10px;
      margin-top: 8px;    
    }
    
    .first-line-big {
      font-size: 14px;
    }
     
    .second-line { 
      color: #777; 
      margin-left: 10px;
      font-size: 13px;
    }
     
    .second-line a {
        color: #777;
    }                                           
      
    .content {
        margin: 8px 25px 8px;
        padding: 5px;        
        font-size: 13px;        
    }  

    .caret {
      margin-left: 6px;
    }
    
    .tag-select {
      margin-right: 15px;
    }
        
    .tags {
      margin-right: 10px;
    } 
`],
  providers: [RssService, TagsService]
})

export class RssComponent {

  @ViewChild('renamefeedmodal') renameFeedModal: RenameFeedModalWindowComponent;

  feedType: number = 0;
  showContent: boolean = true;
  feeds: RssFeed[];
  items: RssItem[] = [];
  selectedFeed: RssFeed;
  folders: string[] = [];
  tags: Tag[] = [];
  source: string = "rss";

  constructor(private rssService: RssService,
              private tagsService: TagsService,
              private route: ActivatedRoute) {

    route.data.subscribe((d: any) => {
      this.feedType = d.section;
    });

    this.tagsService.getTags().then(tags => {
      this.tags = tags;
    });
  }

  ngOnInit(): void {
    this.rssService.getUnreadFeeds(this.feedType).then(feeds => {
      this.feeds = feeds;
      this.folders = _.chain(this.feeds)
                      .map(function(f: RssFeed) { return f.Folder; })
                      .uniq().value();
    });
  }

  onFeedSelected(e: MouseEvent, feed: RssFeed) {

    this.selectedFeed = feed;
    this.showContent = this.selectedFeed.ShowContent == 1;

    this.rssService.getRssItems(this.selectedFeed.Id).then(items => {
      this.items = items;
    });

    e.preventDefault();
  }

  feedsByFolder(folder: string): RssFeed[] {
    return _.filter(this.feeds, function(f: RssFeed) { return f.Folder == folder; });
  }

  showModal(e: MouseEvent): void {
    this.renameFeedModal.show();
    e.preventDefault();
  }

  onChangeShowContent(e: MouseEvent): void {

    this.showContent = !this.showContent;
    this.selectedFeed.ShowContent = this.showContent ? 1 : 0;
    this.updateAndReloadFeed(this.selectedFeed);
    e.preventDefault();
  }

  updateAndReloadFeed(feed: RssFeed): void {
    this.rssService.putFeed(feed).then(r => {
      this.rssService.getRssItems(feed.Id).then(items => {
        this.items = items;
      });
    });
  }

  updateFeed(feed: RssFeed): void {
    feed.SyncInterval = parseInt(feed.SyncInterval);
    this.rssService.putFeed(feed);
  }

  onSortByNewest(e: MouseEvent): void {

    this.selectedFeed.ShowOrder = 0;
    this.updateAndReloadFeed(this.selectedFeed);
    e.preventDefault();
  }

  onSortByOldest(e: MouseEvent): void {

    this.selectedFeed.ShowOrder = 1;
    this.updateAndReloadFeed(this.selectedFeed);
    e.preventDefault();
  }

  readAll(e: MouseEvent): void {

    var feed_id = this.selectedFeed.Id;
    this.rssService.markRssFeedAsReaded(feed_id);
    this.items = [];
    this.feeds = _.chain(this.feeds)
                  .filter(function(f: RssFeed) { return f.Id !== feed_id }).value();

    e.preventDefault();
  }

  markAsReadedAndDeleteItem(item: RssItem) {

    this.rssService.markRssItemAsReaded(item.Id);
    this.items = _.filter(this.items, function(q: RssItem) { return q.Id != item.Id });
    this.feeds = _.chain(this.feeds)
      .each(function(r: RssFeed) { if (r.Id == item.FeedId) r.Unreaded--; })
      .filter(function(r: RssFeed) { return r.Unreaded > 0 }).value();
  }

  keyEvent(data: any):void {

    switch (data.key) {
      case "j":

        // mark as read
        if (this.items.length > 0)
          this.markAsReadedAndDeleteItem(this.items[0]);

        // fetch new items
        if (this.items.length == 0) {
          this.rssService.getRssItems(this.selectedFeed.Id).then(items => {
            this.items = items;
          });
        }

        break;
    }
  }

  markAsRead(e: MouseEvent, item: RssItem) {

    this.markAsReadedAndDeleteItem(item);
    e.preventDefault();
  }

  unsubscribe(e: MouseEvent) {

    var feed_id = this.selectedFeed.Id;
    this.rssService.unsubscribe(feed_id);
    this.items = [];
    this.feeds = _.chain(this.feeds)
      .filter(function(f: RssFeed) { return f.Id !== feed_id }).value();

    e.preventDefault();
  }
}

