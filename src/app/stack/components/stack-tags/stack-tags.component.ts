import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  StackState, GET_QUESTIONS, SET_SELECTED_TAG, SET_SECOND_TAG,
  GET_SECOND_TAGS
} from '../../actions/stack.actions';
import {StackService} from "../../services/stack.service";
import {StackQuestion, SecondTag} from "../../models/stack-question";

@Component({
  selector: 'stack-tags',
  templateUrl: './stack-tags.component.html',
  styleUrls: ['./stack-tags.component.css']
})
export class StackTagsComponent implements OnInit {

  @Output() handleTagSelect = new EventEmitter();
  state: StackState;
  showSecondTags: boolean = false;

  constructor(private store: Store<StackState>,
             private stackService: StackService) {
    store.select('stackReducer').subscribe((data: StackState) => {
      this.state = data;
    });
  }

  onTagSelect(e: MouseEvent, classification: string) {

    this.store.dispatch({type: SET_SELECTED_TAG, payload: classification});

    this.stackService.getSecondTags(classification).then(second_tags => {

      this.store.dispatch({type: GET_SECOND_TAGS, payload: second_tags});

      if ((second_tags.length == 0) ||
          (second_tags.length == 1 && second_tags[0].details == "general")) {

        this.handleTagSelect.emit();
        this.showSecondTags = false;
      } else {
        this.store.dispatch({type: GET_QUESTIONS, payload: []});
        this.showSecondTags = true;
      }
    });

    e.preventDefault();
  }

  onSecondTagSelect(e: MouseEvent, second_tag: string) {

    this.store.dispatch({type: SET_SECOND_TAG, payload: second_tag});
    this.handleTagSelect.emit([this.state.selectedTag, second_tag]);
    e.preventDefault();
  }

  ngOnInit() {
  }
}
