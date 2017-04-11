import { Component, Input, OnInit } from '@angular/core';

import { Tag } from "../../tags/tags";
import { TagsService } from "../../tags/tags.service";

@Component({
  moduleId: module.id,
  selector: 'tag-select',
  template:
    `
      <div class="btn-group tags" dropdown>       
        <a href="#" dropdownToggle (click)="$event.preventDefault();">
          <span class="glyphicon glyphicon-tags"></span>
        </a>
        <ul *dropdownMenu role="menu" aria-labelledby="single-button" class="dropdown-menu dropdown-menu-right">
          <li *ngFor="let t of tags" role="menuitem"><a href="#" (click)="onInsertTag($event, t)">{{t.title}}</a></li>
        </ul>
      </div>              
    `,
  styles: [
    ` 
      .dropdown-menu {
            min-width: 100px !important;
      }
 
      .dropdown-menu > li > a {
        line-height: 1 !important;
        padding: 2px 10px !important; 
        font-size: 13px !important;
      }
    `
  ],
  providers: [TagsService]
})

export class TagSelectComponent {
  @Input() tags: Tag[];
  @Input() itemId: number;
  @Input() source: string;

  constructor(private tagsService: TagsService) { }

  onInsertTag(e: MouseEvent, t: Tag): void {

    e.preventDefault();

    switch(this.source)
    {
      case "stack":
        this.tagsService.insertTaggedItem(this.itemId, t.id, 1);
        break;
      case "rss":
        this.tagsService.insertTaggedItem(this.itemId, t.id, 2);
        break;
    }
  }
}
