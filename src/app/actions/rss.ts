import { Action } from '@ngrx/store'
import {RssFeed, RssItem} from "../rss/rss";

import * as _ from 'underscore';

export interface AppState {
  feeds: RssFeed[];
  folders: string[];
  rssItems: RssItem[];
  showContent: boolean;
}

const initialState: AppState = {
  feeds: [],
  folders: [],
  rssItems: [],
  showContent: true
};

export const GET_FEEDS = 'GET_FEEDS';
export const REMOVE_FEED = 'REMOVE_FEED';
export const GET_FEED_ITEMS = 'GET_FEED_ITEMS';
export const CLEAR_FEED_ITEMS = 'CLEAR_FEED_ITEMS';
export const SET_SHOW_CONTENT = 'SET_SHOW_CONTENT';

export function feedsReducer(state: AppState = initialState, action: Action): AppState {

  switch(action.type) {

    case GET_FEEDS: {

      return {
        feeds: action.payload,
        folders: _.chain(action.payload)
                  .map(function(f: RssFeed) { return f.Folder; })
                  .uniq().value(),
        rssItems: state.rssItems,
        showContent: state.showContent
      }
    }

    case GET_FEED_ITEMS: {

      return {
        feeds: state.feeds,
        folders: state.folders,
        rssItems: action.payload,
        showContent: state.showContent
      }
    }

    case CLEAR_FEED_ITEMS: {

      return {
        feeds: state.feeds,
        folders: state.folders,
        rssItems: [],
        showContent: state.showContent
      }
    }

    case REMOVE_FEED: {

      return {
        feeds: _.chain(state.feeds)
                .filter(function(f: RssFeed) { return f.Id !== action.payload }).value(),
        folders: state.folders,
        rssItems: state.rssItems,
        showContent: state.showContent
      }
    }

    case SET_SHOW_CONTENT: {

      return {
        feeds: state.feeds,
        folders: state.folders,
        rssItems: state.rssItems,
        showContent: action.payload
      }
    }

    default:
      return state;
  }
}
