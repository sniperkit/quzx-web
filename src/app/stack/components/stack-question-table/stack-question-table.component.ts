import { Component, OnInit } from '@angular/core';
import {StackService} from "../../services/stack.service";

import { Store } from '@ngrx/store';
import { StackState, GET_TAGS, GET_QUESTIONS } from '../../actions/stack.actions';
import {StackQuestion} from "../../models/stack-question";

import * as _ from "underscore";
import {StackTag} from "../../models/stack-tag";

@Component({
  selector: 'stack-question-table',
  templateUrl: './stack-question-table.component.html',
  styleUrls: ['./stack-question-table.component.css']
})
export class StackQuestionTableComponent implements OnInit {

  state: StackState;
  selectedClassification: string;
  source: string = "stack";

  constructor(private store: Store<StackState>,
              private stackService: StackService) {

    store.select('stackReducer').subscribe((data: StackState) => this.state = data );
  }

  ngOnInit() {
  }

  onTagSelect(classification: string) {

    this.selectedClassification = classification;
    this.stackService .getQuestions(classification).then(questions => {
      this.store.dispatch({type: GET_QUESTIONS, payload: questions});
    });
  }

  markQuestionAsRead(question: StackQuestion) {

    this.stackService.setQuestionAsRead(question.questionid);
    this.store.dispatch({type: GET_QUESTIONS,
      payload: _.filter(this.state.questions, function(q: StackQuestion) { return q.questionid != question.questionid })});

    this.store.dispatch({type: GET_TAGS,
      payload: _.chain(this.state.tags)
        .each((t: StackTag) => { if (t.Classification == this.selectedClassification) t.Unreaded--; })
        .filter(function(t: StackTag) { return t.Unreaded > 0 }).value()});
  }

  markAsRead(e: MouseEvent, question: StackQuestion) {
    this.markQuestionAsRead(question);
    e.preventDefault();
  }

  keyEvent(data: any):void {

    switch (data.key) {
      case "j":
        if (this.state.questions.length > 0)
          this.markQuestionAsRead(this.state.questions[0]);
        break;
    }
  }
}
