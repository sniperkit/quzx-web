import {Component, Input, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {RssFeed} from "../../rss/rss";

@Component({
  moduleId: module.id,
  selector: 'renamefeed-modalwindow',
  template:
    `
      <div class="modal fade" bsModal #staticModal="bs-modal" [config]="{backdrop: 'static'}"
              tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title pull-left">Edit Feed</h4>
                <button type="button" class="close pull-right" aria-label="Close" (click)="staticModal.hide()">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" *ngIf="selectedFeed">             
              <div class="modal-label">Name:</div>
              <input #newName name="new-name" id="new-name" class="form-control my-modal" type="text" [(ngModel)]="selectedFeed.AlternativeName" />
              <div class="modal-label">Folder:</div>
              <input #newFolder name="new-folder" id="new-folder" class="form-control my-modal" type="text" [(ngModel)]="selectedFeed.Folder" />
              <div class="modal-label">Sync interval:</div>
              <input #newFolder name="new-folder" id="new-folder" class="form-control my-modal" type="text" [(ngModel)]="selectedFeed.SyncInterval" />
              <button class="btn btn-default my-modal" (click)="onRenameFeed()">Save</button>
            </div>
          </div>
         </div>
       </div>             
    `,
  styles: [
    ` 
      .modal-body {
          padding: 10px;
      }
 
      .modal-label {
        font-size: 13px !important;
        margin-bottom: 2px !important;
      }
 
      input.my-modal {
          font-size: 13px !important;
          padding: 1px 2px !important;
          height: 26px !important;
          margin-bottom: 3px !important;
      }
      
      button.my-modal {
        margin-top: 10px;
        font-size: 13px !important;
        padding: 3px 6px !important;
      }
    `
  ],
  providers: []
})

export class RenameFeedModalWindowComponent {

  @Input() selectedFeed: RssFeed;
  @Output() onFeedWasModified = new EventEmitter();

  @ViewChild('staticModal') public renameModal:ModalDirective;

  constructor() { }

  show(): void {
    this.renameModal.show();
  }

  onRenameFeed(): void {
    this.renameModal.hide();
    this.onFeedWasModified.emit(this.selectedFeed);
  }
}
