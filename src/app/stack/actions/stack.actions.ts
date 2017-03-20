import { Action } from '@ngrx/store'
import { StackQuestion } from "../models/stack-question";
import { StackTag } from "../models/stack-tag";

import * as _ from 'underscore';
import {Tag} from "../../tags/tags";

export interface StackState {
  tags: StackTag[];
  questions: StackQuestion[];
  generalTags: Tag[];
}

const initialState: StackState = {
  tags: [],
  questions: [],
  generalTags: []
};

export const GET_TAGS = 'GET_TAGS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_GENERAL_TAGS = 'GET_GENERAL_TAGS';
export const SET_QUESTION_AS_READ = 'SET_QUESTION_AS_READ';

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
        generalTags: state.generalTags
      }
    }

    default:
      return state;
  }
}

