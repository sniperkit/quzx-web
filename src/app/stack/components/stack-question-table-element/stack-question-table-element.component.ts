import {Component, OnInit, Input} from '@angular/core';
import {StackQuestion} from "../../models/stack-question";

import { Store } from '@ngrx/store';
import { StackState, SET_QUESTION_AS_READ } from '../../actions/stack.actions';
import {StackService} from "../../services/stack.service";

@Component({
  selector: 'stack-question-table-element',
  templateUrl: './stack-question-table-element.component.html',
  styleUrls: ['./stack-question-table-element.component.css']
})

export class StackQuestionTableElementComponent implements OnInit {

  @Input() question: StackQuestion;

  state: StackState;
  source: string = "stack";

  constructor(private store: Store<StackState>,
              private stackService: StackService) {
    store.select('stackReducer').subscribe((data: StackState) => this.state = data );
  }

  ngOnInit() {
  }

  markAsRead(e: MouseEvent, question: StackQuestion) {

    this.stackService.setQuestionAsRead(question.questionid);
    this.store.dispatch({type: SET_QUESTION_AS_READ, payload: question});
    e.preventDefault();
  }
}
