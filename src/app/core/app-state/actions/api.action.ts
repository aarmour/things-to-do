import { Action } from '@ngrx/store';
import { type } from '../util';

export interface ApiPayload {
  method: 'get' | 'post' | 'put' | 'delete',
  path: string,
  data?: any,
  SuccessAction: any,
  FailAction: any
}

export const API = type('api');

export class ApiAction implements Action {

  type = API;

  constructor(public payload: ApiPayload) {}
}
