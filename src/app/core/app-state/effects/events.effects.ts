import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
  FETCH_EVENT,
  SELECT_EVENT,
  ApiAction,
  FetchEventAction,
  FetchEventSuccessAction,
  FetchEventFailAction,
  SelectEventSuccessAction
} from '../actions';
import { State, getEventIds } from '../reducers';

@Injectable()
export class EventsEffects {

  constructor(private store: Store<State>, private actions: Actions) {}

  @Effect()
  fetchEvent = this.actions
    .ofType(FETCH_EVENT)
    .map(action => new ApiAction({
      method: 'get',
      path: `/events/${action.payload}`,
      SuccessAction: FetchEventSuccessAction,
      FailAction: FetchEventFailAction
    }));

  @Effect()
  selectEvent = this.actions
    .ofType(SELECT_EVENT)
    .withLatestFrom(this.store)
    .map(([action, state]) => [action, state.events.ids.has(action.payload)])
    .map(([action, hasEntity]) => hasEntity ? [new SelectEventSuccessAction(action.payload)] : [new FetchEventAction(action.payload), new SelectEventSuccessAction(action.payload)])
    .mergeMap(actions => Observable.from(actions));

}
