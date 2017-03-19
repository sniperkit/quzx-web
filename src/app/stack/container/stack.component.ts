import { Component } from '@angular/core'
import {StackService} from "../services/stack.service";
import {StackTag} from "../models/stack-tag";

import { Store } from '@ngrx/store';
import { StackState, GET_TAGS } from '../actions/stack.actions';

import * as _ from "underscore";

import {Tag} from "../../tags/tags";
import {TagsService} from "../../tags/tags.service";
import {StackQuestion} from "../models/stack-question";

@Component({
  moduleId: module.id,
  selector: 'stack',
  templateUrl: 'stack.component.html',
  styleUrls: ['stack.component.css'],
  providers: [StackService, TagsService]
})

export class StackComponent {

  state: StackState;
  selectedTag: string = "";
  questions: StackQuestion[] = [];
  tags: Tag[] = [];
  source: string = "stack";

  constructor(private store: Store<StackState>,
              private stackService: StackService,
              private tagsService: TagsService) {

    store.select('stackReducer').subscribe((data: StackState) => this.state = data );

    this.stackService.getStackTags().then(tags => {
      this.store.dispatch({type: GET_TAGS, payload: tags});
    });

    this.getTags();
  }

  handleTagSelect(event: MouseEvent, tag: string) {
    this.selectedTag = tag;
    this.getQuestions();
    event.preventDefault();
  }

  markAllAsRead() {

    var tag = this.selectedTag;
    this.stackService.setQuestionsAsReadByClassification(tag).then(() => {
      this.stackService.getStackTags().then(tags => {
        this.store.dispatch({type: GET_TAGS, payload: tags});
      });
    });
  }

  markAllAsReadOlderOneDay() {

    let moment = Math.round((new Date().getTime()) / 1000) - 24 * 60 * 60;
    var tag = this.selectedTag;
    this.stackService.setQuestionsAsReadByClassificationFromTime(tag, moment).then(() => {
      this.stackService.getStackTags().then(tags => {
        this.store.dispatch({type: GET_TAGS, payload: tags});
      });
    });
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
    this.store.dispatch({type: GET_TAGS,
      payload: _.chain(this.state.tags)
                .each((t: StackTag) => { if (t.Classification == this.selectedTag) t.Unreaded--; })
                .filter(function(t: StackTag) { return t.Unreaded > 0 }).value()});

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
