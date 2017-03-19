import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise'

import { Tweet } from '../models/tweet'
import {contentHeaders} from "../../common/services/headers";
import {AppSettings} from "../../common/app.settings";

@Injectable()
export class TweetService {

  private favTweetsUrl = AppSettings.API_ENDPOINT  + 'api/twitter/favorites/';

  constructor(private http: Http) { }

  getTweets(name: string): Promise<Tweet[]> {
    return this.http.get(this.favTweetsUrl + name, new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as Tweet[])
      .catch(this.handleError);
  }

  unfavorite(id: string) {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/twitter/unfavorite', '{"id":' + id + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
