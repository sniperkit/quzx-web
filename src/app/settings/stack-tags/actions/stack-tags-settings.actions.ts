import { Action } from '@ngrx/store';
import {StackTag} from '../../../common/models/stack-tag';

export interface SettingsStackTagsState {
  tags: StackTag[];
  secondTags: StackTag[];
}

const initialState: SettingsStackTagsState = {
  tags: [],
  secondTags: []
};

export const GET_STACK_TAGS = 'GET_STACK_TAGS';
export const CHANGE_STACK_TAG_VISIBILITY = 'CHANGE_STACK_TAG_VISIBILITY';
export const GET_SECOND_STACK_TAGS = 'GET_SECOND_STACK_TAGS';

export function settingsStackTagsReducer(state: SettingsStackTagsState = initialState, action: Action): SettingsStackTagsState {

  switch (action.type) {

    case GET_STACK_TAGS: {
      return Object.assign({}, state, {
        tags: action.payload,
        secondTags: state.secondTags
      });
    }

    case CHANGE_STACK_TAG_VISIBILITY: {

      const tagId = action.payload;
      console.log(tagId);

      return Object.assign({}, state, {
        tags: state.tags,
        secondTags: state.secondTags
      });
    }

    case GET_SECOND_STACK_TAGS: {
      return Object.assign({}, state, {
        tags: state.tags,
        secondTags: action.payload
      });
    }

    default:
      return state;
  }
}

