import { Action } from '@ngrx/store'
import {StackQuestion, SecondTag} from "../models/stack-question";
import { StackTag } from "../models/stack-tag";

import * as _ from 'underscore';
import {Tag} from "../../tags/tags";

export enum TagState {
  NoneSelected,
  FirstSelected,
  SecondSelected
}

export interface StackState {
  tags: StackTag[];
  secondTags: SecondTag[];
  questions: StackQuestion[];
  generalTags: Tag[];
  selectedTag: string;
  secondTag: string;
  tagState: TagState;
}

const initialState: StackState = {
  tags: [],
  secondTags: [],
  questions: [],
  generalTags: [],
  selectedTag: '',
  secondTag: '',
  tagState: TagState.NoneSelected
};

export const GET_TAGS = 'GET_TAGS';
export const GET_SECOND_TAGS = 'GET_SECOND_TAGS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_GENERAL_TAGS = 'GET_GENERAL_TAGS';
export const SET_QUESTION_AS_READ = 'SET_QUESTION_AS_READ';
export const SET_SELECTED_TAG = 'SET_SELECTED_TAG';
export const SET_SECOND_TAG = 'SET_SECOND_TAG';
export const RESET_SELECTED_TAGS = 'RESET_SELECTED_TAGS';

export function stackReducer(state: StackState = initialState, action: Action): StackState {

  switch(action.type) {

    case GET_TAGS: {
      return Object.assign({}, state, {tags: action.payload});
    }

    case GET_SECOND_TAGS: {
      return Object.assign({}, state, {secondTags: action.payload});
    }

    case GET_QUESTIONS: {
      return Object.assign({}, state, {questions: action.payload});
    }

    case GET_GENERAL_TAGS: {
      return Object.assign({}, state, {generalTags: action.payload});
    }

    case SET_QUESTION_AS_READ: {

      let question = action.payload;
      let firstTag = question.classification;
      let secondTag = question.details;

      let tags = _.chain(state.tags)
                  .each((t: StackTag) => { if (t.Classification == firstTag) t.Unreaded--; })
                  .filter(function(t: StackTag) { return t.Unreaded > 0 }).value();
      let questions = _.filter(state.questions,
                          function(q: StackQuestion) { return q.questionid != action.payload.questionid });
      let secondTags = _.chain(state.secondTags)
                        .each((t: SecondTag) => { if (t.details == secondTag) t.count--; })
                        .filter(function(t: SecondTag) { return t.count > 0 }).value();

      return Object.assign({}, state, { tags: tags, secondTags: secondTags, questions: questions});

    }

    case SET_SELECTED_TAG: {
      return Object.assign({}, state, { selectedTag: action.payload, tagState: TagState.FirstSelected })
    }

    case SET_SECOND_TAG: {

      let tagState = action.payload === "" ? TagState.FirstSelected : TagState.SecondSelected;
      return Object.assign({}, state, { secondTag: action.payload, tagState: tagState })
    }

    case RESET_SELECTED_TAGS: {
      return Object.assign({}, state, { selectedTag: '', secondTag: '', tagState: TagState.NoneSelected })
    }

    default:
      return state;
  }
}

