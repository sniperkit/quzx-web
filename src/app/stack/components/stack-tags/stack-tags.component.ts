import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Store } from '@ngrx/store';
import {StackState, GET_QUESTIONS} from '../../actions/stack.actions';
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

  second_tags: SecondTag[];
  classification: string;
  details: string;
  showSecondTags: boolean = false;

  constructor(private store: Store<StackState>,
             private stackService: StackService) {
    store.select('stackReducer').subscribe((data: StackState) => {
      this.state = data;
    });
  }

  onTagSelect(e: MouseEvent, classification: string) {

    this.classification = classification;
    this.details = "";

    this.stackService.getSecondTags(classification).then(second_tags => {

      this.second_tags = second_tags.map((t: SecondTag) => {
        if (t.details == "")
          t.details = "general"
        return t;
      });

      if ((this.second_tags.length == 0) ||
          (this.second_tags.length == 1 && this.second_tags[0].details == "general")) {

        this.handleTagSelect.emit([this.classification, ""]);
        this.showSecondTags = false;
      } else {
        this.store.dispatch({type: GET_QUESTIONS, payload: []});
        this.showSecondTags = true;
      }
    });

    e.preventDefault();
  }

  onSecondTagSelect(e: MouseEvent, second_tag: string) {

    if (second_tag == "general")
      second_tag = "";

    this.handleTagSelect.emit([this.classification, second_tag]);
    e.preventDefault();
  }

  ngOnInit() {
  }

}
