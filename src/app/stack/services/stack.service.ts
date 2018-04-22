import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import {StackQuestion, SecondTag} from '../models/stack-question';
import {StackTag} from '../../common/models/stack-tag';
import {contentHeaders, requestHeaders } from '../../common/services/headers';
import {AppSettings} from '../../common/app.settings';

@Injectable()
export class StackService {

  private stackTagsUrl = AppSettings.API_ENDPOINT  + 'api/stack/tags';
  private stackQuestionsUrl = AppSettings.API_ENDPOINT  + 'api/stack/questions/';

  constructor(private http: Http, private httpClient: HttpClient) { }

  getStackTags(): Observable<StackTag[]> {
    return this.httpClient.get<StackTag[]>(AppSettings.API_ENDPOINT  + 'api/stack/tags', { headers: requestHeaders });
  }

  getSecondTags(classification: string): Promise<SecondTag[]> {
    return this.http.get(AppSettings.API_ENDPOINT + 'api/stack/secondtags/' + classification, new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as SecondTag[])
      .catch(this.handleError);
  }

  getQuestions(classification: string): Promise<StackQuestion[]> {
    return this.http.get(this.stackQuestionsUrl + classification, new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as StackQuestion[])
      .catch(this.handleError);
  }

  getQuestionsByTwoTagsAndSortingOrder(classification: string, second_tag: string, sorting_order: string): Promise<StackQuestion[]> {

    return this.http.get(this.stackQuestionsUrl + classification + '/' + second_tag + '/' + sorting_order,
                         new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as StackQuestion[])
      .catch(this.handleError);
  }

  setQuestionAsRead(questionId: number): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/stack/question-as-read', '{"questionid":' + questionId + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  setQuestionsAsReadByClassification(classification: string): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/stack/tags/as-read',
      '{"tag":"' + classification + '"}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  setQuestionsAsReadByClassificationFromTime(classification: string, time: number): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/stack/tags/from-time/as-read',
      '{"tag":"' + classification + '", "fromTime":' + time + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  changeTagVisibility(tagId: number): Promise<any> {

    return this.http.post(AppSettings.API_ENDPOINT  + 'api/stack/tags/' + tagId + '/changeVisibility',
      '{"id":' + tagId + '}', new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
