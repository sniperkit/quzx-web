import { Action } from '@ngrx/store'
import { StackQuestion } from "../models/stack-question";
import { StackTag } from "../models/stack-tag";

import * as _ from 'underscore';

export interface StackState {
  tags: StackTag[];
}

const initialState: StackState = {
  tags: []
};

export const GET_TAGS = 'GET_TAGS';


export function stackReducer(state: StackState = initialState, action: Action): StackState {

  switch(action.type) {

    case GET_TAGS: {
      return Object.assign({}, state, {tags: action.payload});
    }

    default:
      return state;
  }
}

