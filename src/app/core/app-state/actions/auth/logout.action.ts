import { Action } from '@ngrx/store';

import { type } from '../../util';

export const LOGOUT = type('logout');

export class LogoutAction implements Action {

  type = LOGOUT;

  constructor() {}

}
