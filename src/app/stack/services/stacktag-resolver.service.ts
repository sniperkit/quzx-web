import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ErrorResponse } from '../../common/models/ErrorResponse';
import { StackTag } from '../../common/models/stack-tag';
import { StackService } from './stack.service';

@Injectable()
export class StackTagsResolverService implements Resolve<StackTag[] | ErrorResponse> {

  constructor(private dataService: StackService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StackTag[] | ErrorResponse> {
    return this.dataService.getStackTags()
      .pipe(
        catchError(err => of(err))
      );
  }
}

