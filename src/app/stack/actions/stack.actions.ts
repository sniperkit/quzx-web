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

    default:
      return state;
  }
}

