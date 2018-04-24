import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';

import 'rxjs/add/operator/toPromise';
import { catchError } from 'rxjs/operators';

import { StackQuestion, SecondTag } from '../models/stack-question';
import { StackTag } from '../../common/models/stack-tag';
import { requestHeaders } from '../../common/services/headers';
import { AppSettings } from '../../common/app.settings';
import {ErrorResponse} from '../../common/models/ErrorResponse';

@Injectable()
export class StackService {

  private stackQuestionsUrl = AppSettings.API_ENDPOINT  + 'api/stack/questions/';

  constructor(private httpClient: HttpClient) { }

  private handleHttpError(error: HttpErrorResponse): Observable<ErrorResponse> {
    const err = new ErrorResponse();
    err.errorNumber = 100;
    err.message = error.statusText;
    err.friendlyMessage = 'An error occurred retrieving data.';
    return ErrorObservable.create(err);
  }

  getStackTags(): Observable<StackTag[] | ErrorResponse> {
    return this.httpClient.get<StackTag[]>(AppSettings.API_ENDPOINT  + 'api/stack/tags',
      { headers: requestHeaders })
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
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
