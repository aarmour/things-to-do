import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/scan';

import { dispatcher } from '../app-state.providers';
import {
  Action,
  BootstrapAction,
  LoginAction,
  LoginSuccessAction,
  LogoutAction
} from '../actions';
import { UserProfile } from '../app-state';
import { AuthService } from '../../auth.service';

@Injectable()
export class AuthObservables {

  constructor(
    @Inject(dispatcher) private dispatcher: Observer<Action>,
    @Inject(dispatcher) private actions: Observable<Action>,
    private authService: AuthService
  ) {
    this.actions.subscribe((action) => {
      if (action instanceof LoginSuccessAction) {
        localStorage.setItem('id_token', action.idToken);
        localStorage.setItem('user_profile', JSON.stringify(action.userProfile));
      } else if (action instanceof LogoutAction) {
        localStorage.removeItem('id_token');
        localStorage.removeItem('user_profile');
      }
    });
  }

  authenticated(initState: boolean = false): Observable<boolean> {
    const { authService, dispatcher } = this;

    return this.actions.scan((state, action) => {
      if (action instanceof BootstrapAction) return authService.authenticated;
      if (action instanceof LoginSuccessAction) return true;
      if (action instanceof LogoutAction) return false;

      return state;
    }, initState);
  }

  idToken(initState: string = null): Observable<string> {
    const { dispatcher } = this;

    return this.actions.scan((state, action) => {
      if (action instanceof BootstrapAction) return localStorage.getItem('id_token');
      if (action instanceof LoginSuccessAction) return action.idToken;
      if (action instanceof LogoutAction) return null;

      return state;
    }, initState);
  }

  userProfile(initState: UserProfile = null): Observable<UserProfile> {
    const { dispatcher } = this;

    return this.actions.scan((state, action) => {
      if (action instanceof LoginSuccessAction) {
        return action.userProfile;
      } else if (action instanceof LogoutAction) {
        return <UserProfile>{};
      } else {
        return state;
      }
    }, initState);
  }
}
