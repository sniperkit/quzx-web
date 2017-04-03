import { Action } from '@ngrx/store'
import { StackQuestion } from "../models/stack-question";
import { StackTag } from "../models/stack-tag";

import * as _ from 'underscore';
import {Tag} from "../../tags/tags";

export interface StackState {
  tags: StackTag[];
  questions: StackQuestion[];
  generalTags: Tag[];
  selectedTag: string;
  secondTag: string;
}

const initialState: StackState = {
  tags: [],
  questions: [],
  generalTags: [],
  selectedTag: '',
  secondTag: ''
};

export const GET_TAGS = 'GET_TAGS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_GENERAL_TAGS = 'GET_GENERAL_TAGS';
export const SET_QUESTION_AS_READ = 'SET_QUESTION_AS_READ';
export const SET_SELECTED_TAG = 'SET_SELECTED_TAG';
export const SET_SECOND_TAG = 'SET_SECOND_TAG';

export function stackReducer(state: StackState = initialState, action: Action): StackState {

  switch(action.type) {

    case GET_TAGS: {
      return Object.assign({}, state, {tags: action.payload});
    }

    case GET_QUESTIONS: {
      return Object.assign({}, state, {questions: action.payload});
    }

    case GET_GENERAL_TAGS: {
      return Object.assign({}, state, {generalTags: action.payload});
    }

    case SET_QUESTION_AS_READ: {

      return {
        tags: _.chain(state.tags)
               .each((t: StackTag) => { if (t.Classification == action.payload.classification) t.Unreaded--; })
               .filter(function(t: StackTag) { return t.Unreaded > 0 }).value(),
        questions: _.filter(state.questions,
          function(q: StackQuestion) { return q.questionid != action.payload.questionid }),
        generalTags: state.generalTags,
        selectedTag: state.selectedTag,
        secondTag: state.secondTag
      }
    }

    case SET_SELECTED_TAG: {
      return Object.assign({}, state, {selectedTag: action.payload})
    }

    case SET_SECOND_TAG: {
      return Object.assign({}, state, {secondTag: action.payload})
    }

    default:
      return state;
  }
}

