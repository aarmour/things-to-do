import { User } from '../models/user.model';

import { Action } from '@ngrx/store';
import { type } from '../util';

export const LOGIN_SUCCESS = type('login success');

export class LoginSuccessAction implements Action {

  type = LOGIN_SUCCESS;

  constructor(public payload: User) {}

}
