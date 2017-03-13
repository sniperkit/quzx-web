import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise'

import { StackQuestion } from './stack-question'
import {StackTag} from "./stack-tag";
import {contentHeaders} from "../common/services/headers";
import {AppSettings} from "../common/app.settings";

@Injectable()
export class StackService {

  private stackTagsUrl = AppSettings.API_ENDPOINT  + 'api/stack/tags';
  private stackQuestionsUrl = AppSettings.API_ENDPOINT  + 'api/stack/questions/';

  constructor(private http: Http) { }

  getStackTags(): Promise<StackTag[]> {
    return this.http.get(this.stackTagsUrl, new RequestOptions({headers: contentHeaders}))
      .toPromise()
      .then(response => response.json() as StackTag[])
      .catch(this.handleError);
  }

  getQuestions(classification: string): Promise<StackQuestion[]> {
    return this.http.get(this.stackQuestionsUrl + classification, new RequestOptions({headers: contentHeaders}))
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
