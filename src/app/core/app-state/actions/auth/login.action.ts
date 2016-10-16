import { Action } from '@ngrx/store';

import { User } from '../../models/user.model';
import { type } from '../../util';

export const LOGIN = type('login');

export class LoginAction implements Action {

  type = LOGIN;

  constructor() {}

}

export const LOGIN_SUCCESS = type('login success');

export class LoginSuccessAction implements Action {

  type = LOGIN_SUCCESS;

  constructor(public payload: User) {}

}
