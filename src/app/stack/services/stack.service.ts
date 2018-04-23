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

  private stackQuestionsUrl = AppSettings.API_ENDPOINT  + 'api/stack/questions/';

  constructor(private http: Http, private httpClient: HttpClient) { }

  getStackTags(): Observable<StackTag[]> {
    return this.httpClient.get<StackTag[]>(AppSettings.API_ENDPOINT  + 'api/stack/tags', { headers: requestHeaders });
  }

  getSecondTags(classification: string): Observable<SecondTag[]> {

    return this.httpClient.get<SecondTag[]>(AppSettings.API_ENDPOINT + 'api/stack/secondtags/' + classification,
      { headers: requestHeaders });
  }

  getQuestionsByTwoTagsAndSortingOrder(classification: string, second_tag: string, sorting_order: string): Observable<StackQuestion[]> {

    return this.httpClient.get<StackQuestion[]>(this.stackQuestionsUrl + classification + '/' + second_tag + '/' + sorting_order,
      { headers: requestHeaders });
  }

  setQuestionAsRead(questionId: number): Observable<any> {

    return this.httpClient.post(AppSettings.API_ENDPOINT  + 'api/stack/question-as-read',
      '{"questionid":' + questionId + '}',
      { headers: requestHeaders });
  }

  setQuestionsAsReadByClassification(classification: string): Observable<any> {

    return this.httpClient.post(AppSettings.API_ENDPOINT  + 'api/stack/tags/as-read',
      '{"tag":"' + classification + '"}',
      { headers: requestHeaders });
    }

  setQuestionsAsReadByClassificationFromTime(classification: string, time: number): Observable<any> {

    return this.httpClient.post(AppSettings.API_ENDPOINT  + 'api/stack/tags/from-time/as-read',
      '{"tag":"' + classification + '", "fromTime":' + time + '}',
      { headers: requestHeaders });
  }

  changeTagVisibility(tagId: number): Observable<any> {

    return this.httpClient.post(AppSettings.API_ENDPOINT  + 'api/stack/tags/' + tagId + '/changeVisibility',
      '{"id":' + tagId + '}',
      { headers: requestHeaders });
  }
}
