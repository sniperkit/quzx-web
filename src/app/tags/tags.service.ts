import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Tag, TaggedItem} from './tags';
import {contentHeaders} from "../services/headers";
import {AppSettings} from "../common/app.settings";

@Injectable()
export class TagsService {

  constructor(private http: Http) { }

  getTags(): Promise<Tag[]> {
    return this.http.get(AppSettings.API_ENDPOINT  + 'api/tags', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as Tag[])
      .catch(this.handleError);
  }


  getTaggedItems(tagid: number): Promise<TaggedItem[]> {

    return this.http.get(AppSettings.API_ENDPOINT  + 'api/tags/items/' + tagid, new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as TaggedItem[])
      .catch(this.handleError);
  }

  insertTaggedItem(itemid: number, tagid: number, source: number): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/tags/add-item',
      '{"itemId":' + itemid + ', "tagId":' + tagid + ', "source":' + source + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteTaggedItem(itemid: number): Promise<any> {

    return this.http.delete(AppSettings.API_ENDPOINT  + 'api/tags/items/' + itemid,
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

