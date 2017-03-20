import {Component, ViewChild} from '@angular/core'
import {StackService} from "../services/stack.service";

import { Store } from '@ngrx/store';
import { StackState, GET_TAGS, GET_GENERAL_TAGS } from '../actions/stack.actions';

import {TagsService} from "../../tags/tags.service";
import {StackQuestionTableComponent} from "../components/stack-question-table/stack-question-table.component";

@Component({
  moduleId: module.id,
  selector: 'stack',
  templateUrl: 'stack.component.html',
  styleUrls: ['stack.component.css'],
  providers: [StackService, TagsService]
})

export class StackComponent {

  @ViewChild('questiontable') questionTable: StackQuestionTableComponent;

  state: StackState;
  selectedTag: string = "";

  constructor(private store: Store<StackState>,
              private stackService: StackService,
              private tagsService: TagsService) {

    store.select('stackReducer').subscribe((data: StackState) => this.state = data );

    this.stackService.getStackTags().then(tags => {
      this.store.dispatch({type: GET_TAGS, payload: tags});
    });

    this.getTags();
  }

  handleTagSelect(classification: string) {
    this.selectedTag = classification;
    this.questionTable.onTagSelect(classification)

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

  getTags(): void {
    this.tagsService.getTags().then(tags => {
      this.store.dispatch({type: GET_GENERAL_TAGS, payload: tags});
    });
  }
}
