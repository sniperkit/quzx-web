import {Component, ViewChild} from '@angular/core'
import {StackService} from "../services/stack.service";

import { Store } from '@ngrx/store';
import { StackState, SortOrder, GET_TAGS, GET_GENERAL_TAGS, CHANGE_SORT_ORDER } from '../actions/stack.actions';

import {TagsService} from "../../tags/tags.service";
import {StackQuestionTableComponent} from "../components/stack-question-table/stack-question-table.component";
import {StackTag} from '../../common/models/stack-tag';

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

  constructor(private store: Store<StackState>,
              private stackService: StackService,
              private tagsService: TagsService) {

    store.select('stackReducer').subscribe((data: StackState) => {
      this.state = data;
    } );

    this.stackService.getStackTags().subscribe(
      (tags: StackTag[]) => this.store.dispatch({type: GET_TAGS, payload: tags}),
      (err: any) => console.log(err)
    );

    this.getTags();
  }

  handleTagSelect() {
    this.questionTable.onTagSelect();
  }

  markAllAsRead() {

    const tag = this.state.selectedTag;
    this.stackService.setQuestionsAsReadByClassification(tag).subscribe(
      () => {
        this.stackService.getStackTags().subscribe(
          (tags: StackTag[]) => this.store.dispatch({type: GET_TAGS, payload: tags}),
          (err: any) => console.log(err));
      },
      (err: any) => console.log(err));
  }

  markAllAsReadOlderOneDay() {

    const moment = Math.round((new Date().getTime()) / 1000) - 24 * 60 * 60;
    const tag = this.state.selectedTag;
    this.stackService.setQuestionsAsReadByClassificationFromTime(tag, moment).subscribe(
      () => {
        this.stackService.getStackTags().subscribe(
          (tags: StackTag[]) => this.store.dispatch({type: GET_TAGS, payload: tags}),
          (err: any) => console.log(err));
      },
      (err: any) => console.log(err));
  }

  sortByDate() {
    this.store.dispatch({type: CHANGE_SORT_ORDER, payload: SortOrder.ByDate });
    this.questionTable.onTagSelect();
  }

  sortByRating() {
    this.store.dispatch({type: CHANGE_SORT_ORDER, payload: SortOrder.ByRating });
    this.questionTable.onTagSelect();
  }

  getTags(): void {
    this.tagsService.getTags().then(tags => {
      this.store.dispatch({type: GET_GENERAL_TAGS, payload: tags});
    });
  }
}
