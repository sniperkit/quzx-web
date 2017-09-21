import { Action } from '@ngrx/store';
import {RssFeed, RssItem} from '../models/rss';

import * as _ from 'underscore';
import {Tag} from '../../tags/tags';

export interface AppState {
  feeds: RssFeed[];
  folders: string[];
  rssItems: RssItem[];
  rssTags: Tag[];
  showContent: boolean;
}

const initialState: AppState = {
  feeds: [],
  folders: [],
  rssItems: [],
  rssTags: [],
  showContent: true
};

export const GET_FEEDS = 'GET_FEEDS';
export const REMOVE_FEED = 'REMOVE_FEED';
export const GET_FEED_ITEMS = 'GET_FEED_ITEMS';
export const CLEAR_FEED_ITEMS = 'CLEAR_FEED_ITEMS';
export const SET_SHOW_CONTENT = 'SET_SHOW_CONTENT';
export const GET_RSS_TAGS = 'GET_RSS_TAGS';

export function feedsReducer(state: AppState = initialState, action: Action): AppState {

  switch (action.type) {

    case GET_FEEDS: {

      return Object.assign({}, state,

        { feeds:   action.payload,
          folders: _.chain(action.payload)
                    .map(function(f: RssFeed) { return f.Folder; })
                    .uniq().value()});
    }

    case GET_FEED_ITEMS: {
      return Object.assign({}, state, {rssItems: action.payload});
    }

    case CLEAR_FEED_ITEMS: {
      return Object.assign({}, state, {rssItems: []});
    }

    case REMOVE_FEED: {
      return Object.assign({}, state,
        {feeds: _.chain(state.feeds)
          .filter(function(f: RssFeed) { return f.Id !== action.payload }).value()});
    }

    case SET_SHOW_CONTENT: {
      return Object.assign({}, state, {showContent: action.payload});
    }

    case GET_RSS_TAGS: {
      return Object.assign({}, state, {rssTags: action.payload});
    }

    default:
      return state;
  }
}
