import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/scan';

import { dispatcher } from '../app-state.providers';
import {
  Action,
  LoginAction,
  LoginSuccessAction,
  LogoutAction
} from '../actions';
import { UserProfile } from '../app-state';

@Injectable()
export class AuthObservables {

  constructor(
    @Inject(dispatcher) private dispatcher: Observer<Action>,
    @Inject(dispatcher) private actions: Observable<Action>
  ) {
    this.actions.subscribe((action) => {
      if (action instanceof LoginSuccessAction) {
        localStorage.setItem('id_token', action.idToken);
        localStorage.setItem('user_profile', JSON.stringify(action.user));
      } else if (action instanceof LogoutAction) {
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_profile');
      }
    });
  }

  authenticated(initState: boolean = false): Observable<boolean> {
    const { dispatcher } = this;

    return this.actions.scan((state, action) => {
      if (action instanceof LoginSuccessAction) {
        return true;
      } else if (action instanceof LogoutAction) {
        return false;
      }

      return state;
    }, initState);
  }

  user(initState: UserProfile = null): Observable<UserProfile> {
    const { dispatcher } = this;

    return this.actions.scan((state, action) => {
      if (action instanceof LoginSuccessAction) {
        return action.user;
      } else if (action instanceof LogoutAction) {
        return <UserProfile>{};
      } else {
        return state;
      }
    }, initState);
  }
}
