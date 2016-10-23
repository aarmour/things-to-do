import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { ApiHttpService } from '../../api-http.service';
import { API, ApiAction } from '../actions';

@Injectable()
export class ApiEffects {

  constructor(private actions: Actions, private http: ApiHttpService) {}

  @Effect()
  fetch = this.actions
    .ofType(API)
    .switchMap(action => this.http[action.payload.method](`http://localhost:3000${action.payload.path}`, decamelizeKeys(action.payload.body))
      .map(res => camelizeKeys(res.json()))
      .map(json => new action.payload.SuccessAction(json))
      .catch(error => Observable.of(new action.payload.FailAction()))
    );

}
