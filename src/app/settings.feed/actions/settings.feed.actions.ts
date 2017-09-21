import { Action } from '@ngrx/store';

import * as _ from 'underscore';
import {RssFeed} from '../../rss/models/rss';

export interface SettingsFeedState {
  feeds: RssFeed[];
  feedsToDisplay: RssFeed[];
  feedTypes: number[];
  nameFilter: string;
  sectionFilter: number;
}

const initialState: SettingsFeedState = {
  feeds: [],
  feedsToDisplay: [],
  feedTypes: [],
  nameFilter: '',
  sectionFilter: 0
};

export const GET_FEEDS = 'GET_FEEDS';
export const SET_NAME_FILTER = 'SET_NAME_FILTER';
export const SET_SECTION_FILTER = 'SET_SECTION_FILTER';

export function settingsFeedReducer(state: SettingsFeedState = initialState, action: Action): SettingsFeedState {

  const applyAllFilters = function(name: string, section: number) {

    let result = state.feeds;

    if (name !== '') {
      result = _.filter(result, function(f: RssFeed)
        { return f.AlternativeName.toLowerCase().indexOf(name.toLowerCase()) > -1; });
    }

    if (section !== 0) {
      result = _.filter(result, function(f: RssFeed)
        { return f.RssType === section; });
    }

    return result;
  };

  switch (action.type) {

    case GET_FEEDS: {
      return Object.assign({}, state, {
        feeds: action.payload,
        feedTypes: _.chain(action.payload)
                    .map(function(f: RssFeed) { return f.RssType; })
                    .uniq().value(),
        feedsToDisplay: action.payload
      });
    }

    case SET_NAME_FILTER: {

    return Object.assign({}, state, {
        nameFilter: action.payload,
        feedsToDisplay: applyAllFilters(action.payload, state.sectionFilter)
      });
    }

    case SET_SECTION_FILTER: {

      return Object.assign({}, state, {
        sectionFilter: action.payload,
        feedsToDisplay: applyAllFilters(state.nameFilter, action.payload)
      });
    }

    default:
      return state;
  }
}

