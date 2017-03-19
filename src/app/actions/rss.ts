import { Action } from '@ngrx/store'
import { RssFeed } from "../rss/rss";

import * as _ from 'underscore';

export interface AppState {
  demoData: number;
  feeds: RssFeed[];
  folders: string[];
}

const initialState: AppState = {
  demoData: 0,
  feeds: [],
  folders: []
};

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const GET_FEEDS = 'GET_FEEDS';

export function feedsReducer(state: AppState = initialState, action: Action): AppState {

  switch(action.type) {
    case INCREMENT: {

      return {
        demoData: state.demoData + 1,
        feeds: [],
        folders: []
      }
    }
    case DECREMENT: {

        return {
          demoData: state.demoData - 1,
          feeds: [],
          folders: []
        }
      }

    case GET_FEEDS: {

      return {
        demoData: state.demoData,
        feeds: action.payload,
        folders: _.chain(action.payload)
                  .map(function(f: RssFeed) { return f.Folder; })
                  .uniq().value()
      }
    }

    default:
      return state;
  }
}
