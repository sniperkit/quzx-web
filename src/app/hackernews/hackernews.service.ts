import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {HackerNews} from './hackernews';
import {contentHeaders} from "../services/headers";
import {AppSettings} from "../common/app.settings";

@Injectable()
export class HackerNewsService {

  constructor(private http: Http) { }

  getNews(): Promise<HackerNews[]> {
    return this.http.get(AppSettings.API_ENDPOINT  + 'api/hn/unread', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as HackerNews[])
      .catch(this.handleError);
  }

  markNewsAsReaded(id: number): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/hn/as-read', '{"id":' + id + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  markNewsAsReadedFromTime(time: number): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/hn/fromtime-as-read', '{"fromTime":' + time + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  markAllNewsAsReaded(): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/hn/all-as-read', '', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

