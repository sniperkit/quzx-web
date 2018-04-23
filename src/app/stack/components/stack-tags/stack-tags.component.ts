import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  StackState, SET_SELECTED_TAG, SET_SECOND_TAG,
  GET_SECOND_TAGS, RESET_SELECTED_TAGS
} from '../../actions/stack.actions';
import {StackService} from "../../services/stack.service";
import {SecondTag} from '../../models/stack-question';

@Component({
  selector: 'stack-tags',
  templateUrl: './stack-tags.component.html',
  styleUrls: ['./stack-tags.component.css']
})
export class StackTagsComponent implements OnInit {

  @Output() handleTagSelect = new EventEmitter();
  state: StackState;

  constructor(private store: Store<StackState>,
             private stackService: StackService) {
    store.select('stackReducer').subscribe((data: StackState) => {
      this.state = data;
    });
  }

  onTagSelect(e: MouseEvent, classification: string) {

    this.store.dispatch({type: SET_SELECTED_TAG, payload: classification});
    this.store.dispatch({type: SET_SECOND_TAG, payload: ''});

    this.stackService.getSecondTags(classification).subscribe(
      (second_tags: SecondTag[]) => {
        this.store.dispatch({type: GET_SECOND_TAGS, payload: second_tags});
        this.handleTagSelect.emit();
      },
      (err: any) => console.log(err));

    e.preventDefault();
  }

  onSecondTagSelect(e: MouseEvent, second_tag: string) {

    this.store.dispatch({type: SET_SECOND_TAG, payload: second_tag});
    this.handleTagSelect.emit([this.state.selectedTag, second_tag]);
    e.preventDefault();
  }

  onBackTagSelect(e: MouseEvent) {
    this.store.dispatch({type: RESET_SELECTED_TAGS});
    e.preventDefault();
  }

  ngOnInit() {
  }
}
