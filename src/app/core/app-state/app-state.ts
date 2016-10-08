import { Injector, OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/zip';

import { Action } from './actions';
import { AuthObservables, MapObservables } from './observables';
import { AuthService } from '../auth.service';

export interface UserProfile {
  name: string,
  nickname: string,
  email: string
}

export interface User {
  idToken: string,
  profile: UserProfile
}

export interface AppState {
  auth: {
    authenticated: boolean,
    user: User
  },
  map: {
    selectedPoint: any
  }
}

export function createAppStateObservable(
  injector: Injector,
  initState: AppState,
  actions: Observable<Action>
): Observable<AppState> {

  const authObservables = injector.get(AuthObservables);
  const mapObservables = injector.get(MapObservables);

  const combine = s => (
    {
      auth: {
        authenticated: s[0],
        user: {
          idToken: s[1],
          profile: s[2]
        }
      },
      map: {
        selectedPoint: s[3]
      }
    }
  );

  const appStateObservable: Observable<AppState> =
    authObservables.authenticated(initState.auth.authenticated)
    .zip(
      authObservables.idToken(initState.auth.user.idToken),
      authObservables.userProfile(initState.auth.user.profile),
      mapObservables.selectedPoint()
    )
    .map(combine);

  return asBehaviorSubject(initState, appStateObservable);
}

function asBehaviorSubject(init, observable) {
  const subject = new BehaviorSubject(init);

  observable.subscribe(s => subject.next(s));

  return subject;
}
