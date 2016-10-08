import { Injector, OpaqueToken } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { createAppStateObservable, } from './app-state';
import { Action } from './actions';
import { AuthObservables, MapObservables } from './observables';
import { AuthService } from '../auth.service';

export const initState = new OpaqueToken('initState');
export const dispatcher = new OpaqueToken('dispatcher');
export const state = new OpaqueToken('state');

export const INIT_STATE = {
  auth: {
    authenticated: false,
    user: {
      idToken: '',
      profile: null
    }
  },
  map: {
    selectedPoint: null
  }
};

export const APP_STATE_PROVIDERS = [
  {
    provide: AuthObservables,
    useClass: AuthObservables,
    deps: [AuthService, dispatcher]
  },
  {
    provide: MapObservables,
    useClass: MapObservables,
    deps: [dispatcher]
  },
  {
    provide: initState,
    useValue: INIT_STATE
  },
  {
    provide: dispatcher,
    useValue: new Subject<Action>()
  },
  {
    provide: state,
    useFactory: createAppStateObservable,
    deps: [Injector, initState, dispatcher]
  }
];
