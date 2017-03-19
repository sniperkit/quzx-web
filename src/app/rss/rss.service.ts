import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {RssItem, RssFeed} from './rss';
import {contentHeaders} from "../services/headers";
import {AppSettings} from "../common/app.settings";

@Injectable()
export class RssService {

  constructor(private http: Http) { }

  getFeeds(url: string): Promise<RssFeed[]> {
    return this.http.get(url, new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as RssFeed[])
      .catch(this.handleError);
  }

  getUnreadFeeds(rssType: number): Promise<RssFeed[]> {
    return this.getFeeds(AppSettings.API_ENDPOINT  + 'api/rss/unread/' + rssType);
  }

  getAllFeeds(): Promise<RssFeed[]> {
    return this.getFeeds(AppSettings.API_ENDPOINT  + 'api/rss/allfeeds');
  }

  getFeed(id: number): Promise<RssFeed> {
    return this.getFeeds(AppSettings.API_ENDPOINT  + 'api/rss/feeds/' + id);
  }

  putFeed(feed :RssFeed): Promise<any> {

    return this.http.put(AppSettings.API_ENDPOINT  + 'api/rss/feeds',
                          JSON.stringify(feed),
                          new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  postFeed(feed :RssFeed): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/rss/feeds',
      JSON.stringify(feed),
      new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getRssItems(id: number): Promise<RssItem[]> {

    return this.http.get(AppSettings.API_ENDPOINT  + 'api/rss/' + id + '/items', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as RssItem[])
      .catch(this.handleError);
  }

  markRssItemAsReaded(id: number): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/rss/item/as-read', '{"id":' + id + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  markRssFeedAsReaded(feed_id: number): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/rss/feed/as-read', '{"feed_id":' + feed_id + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  unsubscribe(feed_id: number): Promise<any> {

    return this.http.delete(AppSettings.API_ENDPOINT  + 'api/rss/feeds/' + feed_id,
      new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

