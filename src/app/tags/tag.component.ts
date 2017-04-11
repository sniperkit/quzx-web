import {Component, OnInit, ViewChild} from '@angular/core'

import { Tag, TaggedItem } from './tags';
import { TagsService } from './tags.service';

import * as _ from 'underscore';
import {ActivatedRoute} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'tags',
  template:
    `
    <div class="vk-section container-fluid">
            
        <div class="row">
        
          <!-- list of feeds -->
          <div class="col-md-2 feed-list">              
            <div *ngFor="let tag of tags">
              <a href="#" (click)="onTagSelected($event, tag)">{{tag.title}} ({{tag.total}})</a>
            </div>
          </div>
          
          <div class="col-md-10">
          
            <div class="row col-md-12 rss-panel"> 
              <div class="btn-group" dropdown>
                <button type="button" class="btn btn-default btn-xs dropdown-toggle" dropdownToggle>
                  Display
                  <span class="caret"></span>
                </button>
                <ul *dropdownMenu role="menu" aria-labelledby="single-button" class="dropdown-menu dropdown-menu-right">
                  <li role="menuitem"><a href="#" (click)="onChangeShowContent($event)">Show content</a></li>
                  <!-- <li role="menuitem"><a href="#" (click)="onSortByNewest($event)">Sort by newest</a></li>
                  <li role="menuitem"><a href="#" (click)="onSortByOldest($event)">Sort by oldest</a></li> -->                 
                </ul>
              </div>
              <!-- <button type="button" class="btn btn-default btn-xs" (click)="readAll($event)">
                Mark all as read            
              </button> -->
            </div>
                                  
            <div id="rss-table" class="row col-md-12" (window:keydown)="keyEvent($event)">
              <div *ngFor="let i of items">
                <div class="rss-element" [ngClass]="{ 'rss-element-dotted' : showContent}">
                  <div class="first-line">
                    <a href="{{i.link}}" [ngClass]="{ 'first-line-big' : showContent}">{{i.title}}</a> 
                  </div>
                  <div class="second-line">
                    ({{i.date | stringdate | cleandate }}) (<a href="#" (click)="markAsReadedAndDeleteItem($event, i)">mark-as-read</a>)
                    from {{i.source}}
                  </div>
                  <div *ngIf="showContent" class="content" [innerHTML]="i.content"></div>
                </div>
              </div>
            </div>        
          </div>      
        </div>       
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
        
    .tags {
      margin-right: 10px;
    } 
`],
  providers: [TagsService]
})

export class TagsComponent {

  showContent: boolean = true;
  tags: Tag[];
  items: TaggedItem[] = [];
  selectedTag: Tag;

  constructor(private tagsService: TagsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tagsService.getTags().then(tags => this.tags = tags )
  }

  onTagSelected(e: MouseEvent, tag: Tag) {

    this.selectedTag = tag;

    this.tagsService.getTaggedItems(this.selectedTag.id).then(items => {
      this.items = items;
    });

    e.preventDefault();
  }

  onChangeShowContent(e: MouseEvent): void {

    this.showContent = !this.showContent;
    e.preventDefault();
  }

  markAsReadedAndDeleteItem(e: MouseEvent, item: TaggedItem) {

    this.tagsService.deleteTaggedItem(item.id);
    this.items = _.filter(this.items, function(q: TaggedItem) { return q.id != item.id });
    this.tags = _.chain(this.tags)
      .each(function(r: Tag) { if (r.id == item.tagid) r.total--; })
      .filter(function(r: Tag) { return r.total > 0 }).value();

    e.preventDefault();
  }

  keyEvent(data: any):void {

    switch (data.key) {
      case "j":
        //if (this.items.length > 0)
        //  this.markAsReadedAndDeleteItem(this.items[0]);
        break;
    }
  }
}


