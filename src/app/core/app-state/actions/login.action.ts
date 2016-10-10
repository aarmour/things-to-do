import { Action } from '@ngrx/store';
import { type } from '../util';

export const LOGIN = type('login');

export class LoginAction implements Action {

  type = LOGIN;

  constructor() {}

}
