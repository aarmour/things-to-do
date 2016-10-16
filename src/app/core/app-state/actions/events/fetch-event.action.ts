import { Action } from '@ngrx/store';

import { type } from '../../util';
import { Event } from '../../models/event.model';

export const FETCH_EVENT = type('fetch event');

export class FetchEventAction implements Action {

  type = FETCH_EVENT;

  constructor(public payload: string) {}

}

export const FETCH_EVENT_SUCCESS = type('fetch event success');

export class FetchEventSuccessAction implements Action {

  type = FETCH_EVENT_SUCCESS;

  constructor(public payload: Event) {}

}

export const FETCH_EVENT_FAIL = type('fetch event fail');

export class FetchEventFailAction implements Action {

  type = FETCH_EVENT_FAIL;

  constructor(public payload: string) {}

}
