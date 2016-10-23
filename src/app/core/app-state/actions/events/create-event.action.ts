import { Action } from '@ngrx/store';

import { type } from '../../util';
import { Event } from '../../models/event.model';

export const CREATE_EVENT = type('create event');

export class CreateEventAction implements Action {

  type = CREATE_EVENT;

  constructor(public payload: Event) {}

}

export const CREATE_EVENT_SUCCESS = type('create event success');

export class CreateEventSuccessAction implements Action {

  type = CREATE_EVENT_SUCCESS;

  constructor(public payload: Event) {}

}

export const CREATE_EVENT_FAIL = type('create event fail');

export class CreateEventFailAction implements Action {

  type = CREATE_EVENT_FAIL;

  constructor(public payload: Event) {}

}
