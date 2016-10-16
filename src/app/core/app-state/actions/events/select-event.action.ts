import { Action } from '@ngrx/store';

import { type } from '../../util';

export const SELECT_EVENT = type('select event');

export class SelectEventAction implements Action {

  type = SELECT_EVENT;

  constructor(public payload: string) {}

}

export const SELECT_EVENT_SUCCESS = type('select event success');

export class SelectEventSuccessAction implements Action {

  type = SELECT_EVENT_SUCCESS;

  constructor(public payload: string) {}

}
