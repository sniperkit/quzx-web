import { Component, OnInit } from '@angular/core';
import {StackService} from "../../services/stack.service";

import { Store } from '@ngrx/store';
import {StackState, GET_TAGS, GET_QUESTIONS, SET_QUESTION_AS_READ} from '../../actions/stack.actions';
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
  second_tag: string;

  constructor(private store: Store<StackState>,
              private stackService: StackService) {

    store.select('stackReducer').subscribe((data: StackState) => this.state = data );
  }

  ngOnInit() {
  }

  onTagSelect(classification: string, second_tag: string) {

    this.selectedClassification = classification;
    this.second_tag = second_tag;
    this.stackService.getQuestionsByTwoTags(classification, second_tag).then(questions => {
      this.store.dispatch({type: GET_QUESTIONS, payload: questions});
    });
  }

  keyEvent(data: any):void {

    switch (data.key) {
      case "j":

        if (this.state.questions.length > 0)
          this.stackService.setQuestionAsRead(this.state.questions[0].questionid);
          this.store.dispatch({type: SET_QUESTION_AS_READ, payload: this.state.questions[0]});
        break;
    }
  }
}
