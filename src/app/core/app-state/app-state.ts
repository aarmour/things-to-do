import { Injector, OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/zip';

import { Action } from './actions';
import { AuthObservables } from './observables';
import { AuthService } from '../auth.service';

export interface UserProfile {
  name: string,
  nickname: string,
  email: string
}

export interface AppState {
  auth: {
    authenticated: boolean,
    user: UserProfile
  }
}

export function loadInitState(authService: AuthService) {
  return {
    auth: {
      authenticated: authService.authenticated,
      user: authService.userProfile
    }
  };
}

export function createAppStateObservable(
  injector: Injector,
  initState: AppState,
  actions: Observable<Action>
): Observable<AppState> {

  const authObservables = injector.get(AuthObservables);

  const combine = s => (
    {
      auth: {
        authenticated: s[0],
        user: s[1]
      }
    }
  );

  const appStateObservable: Observable<AppState> =
    authObservables.authenticated(initState.auth.authenticated)
    .zip(authObservables.user(initState.auth.user))
    .map(combine);

  return asBehaviorSubject(initState, appStateObservable);
}

function asBehaviorSubject(init, observable) {
  const subject = new BehaviorSubject(init);

  observable.subscribe(s => subject.next(s));

  return subject;
}
