import { Component } from '@angular/core'
import {StackService} from "./stack.service";
import {StackTag} from "./stack-tag";

import * as _ from "underscore";
import {Tag} from "../tags/tags";
import {TagsService} from "../tags/tags.service";
import {StackQuestion} from "./stack-question";

@Component({
  moduleId: module.id,
  selector: 'stack',
  template:
    `
      <div class="stack-section container-fluid">
              
        <div class="row col-md-12 st-panel">          
          <button type="button" class="btn btn-default btn-xs" (click)="markAllAsRead($event)">
            Mark all as read            
          </button>
          <button type="button" class="btn btn-default btn-xs" (click)="markAllAsReadOlderOneDay($event)">
            Mark as read items older than a day            
          </button>
        </div>      
              
        <div>        
          <span *ngFor="let tag of stackTags">
            <a href="/stack" (click)="handleTagSelect($event, tag.Classification)">{{tag.Classification}} ({{tag.Unreaded}})</a>
          </span>                           
        </div>
                  
        <div id="stack-table" (window:keydown)="keyEvent($event)">
          <div *ngFor="let q of questions">
            <div class="stack-element">
              <div class="first-line">
                <a href="{{q.link}}" class="question-header">{{q.title}}</a> 
                <tag-select [tags]="tags" [itemId]="q.id" [source]="source" class="tag-select"></tag-select>                 
                <a href="#" class="remove-icon" (click)="markAsRead($event, q)">
                  <span class="glyphicon glyphicon-remove "></span>
                </a>
              </div>
              <div class="second-line">
                [{{q.tags}}] ({{q.creationdate | stringdate | cleandate }})
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  styles: [
    `
      .stack-section { 
        margin-top: 15px; 
        margin-left: 20px;
        margin-right: 20px;
      }   
      
      .st-panel {
        margin-bottom: 10px;
      }
                                   
      a { font-size: 13px; }
      a.question-header { font-size: 14px; }   
        
      div#stack-table { margin-top: 20px; }      
      .stack-element {
        margin-bottom: 8px;
      }
      .second-line { 
        color: #777; 
        font-size: 13px;
       }
      .second-line a {
        color: #777;
      } 
      
      .tag-select {
        margin-left: 10px;
      }
      
      .remove-icon {
        margin-left: 5px;
        color: #337ab7;
      }
    `
  ],
  providers: [StackService, TagsService]
})

export class StackComponent {

  selectedTag: string = "";
  stackTags: StackTag[] = [];

  questions: StackQuestion[] = [];
  tags: Tag[] = [];
  source: string = "stack";

  constructor(private stackService: StackService, private tagsService: TagsService) {

    this.stackService.getStackTags().then(tags => {
      this.stackTags = tags;
    });

    this.getTags();
  }

  handleTagSelect(event: MouseEvent, tag: string) {
    this.selectedTag = tag;
    this.getQuestions();
    event.preventDefault();
  }

  markAllAsRead(event: MouseEvent) {

    var tag = this.selectedTag;
    this.stackService.setQuestionsAsReadByClassification(tag).then(() => {
      this.stackService.getStackTags().then(tags => {
        this.stackTags = tags;
      });
    });

    event.preventDefault();
  }

  markAllAsReadOlderOneDay(event: MouseEvent) {

    let moment = Math.round((new Date().getTime()) / 1000) - 24 * 60 * 60;
    var tag = this.selectedTag;
    this.stackService.setQuestionsAsReadByClassificationFromTime(tag, moment).then(() => {
      this.stackService.getStackTags().then(tags => {
        this.stackTags = tags;
        console.log(tags);
      });
    });

    event.preventDefault();
  }

  getQuestions(): void {
    if (this.selectedTag == "") return;
    this.stackService .getQuestions(this.selectedTag).then(questions => {
      this.questions = questions;
    });
  }

  getTags(): void {

    this.tagsService.getTags().then(tags => {
      this.tags = tags;
    });
  }

  markQuestionAsRead(question: StackQuestion) {

    this.stackService.setQuestionAsRead(question.questionid);
    this.questions = _.filter(this.questions, function(q: StackQuestion) { return q.questionid != question.questionid });
    this.stackTags = _.chain(this.stackTags)
                      .each((t: StackTag) => { if (t.Classification == this.selectedTag) t.Unreaded--; })
                      .filter(function(t: StackTag) { return t.Unreaded > 0 }).value();
  }

  markAsRead(e: MouseEvent, question: StackQuestion) {

    this.markQuestionAsRead(question);
    e.preventDefault();
  }

  keyEvent(data: any):void {

    switch (data.key) {
      case "j":
        if (this.questions.length > 0)
          this.markQuestionAsRead(this.questions[0]);
        break;
    }
  }
}
