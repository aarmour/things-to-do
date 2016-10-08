import { Inject, Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/fromEventPattern';

import {
  Action,
  LoginSuccessAction,
  LogoutAction,
  dispatcher
} from './app-state';

@Injectable()
export class AuthService {

  // TODO: get client ID and domain from config
  private lock = new Auth0Lock('S4l1AdOBaXov8pYoQxegKSywBYu2nwox', 'ttd.auth0.com', {
    rememberLastLogin: false,
    auth: {
      // TODO: replace hardcoded URL
      redirectUrl: 'http://localhost:4200',
      responseType: 'id_token'
    }
  });

  private idTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(@Inject(dispatcher) private dispatcher: Observer<Action>) {
    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        // TODO: dispatch LoginFailureAction
        if (error) return console.error(error);
        this.dispatcher.next(new LoginSuccessAction(authResult.idToken, profile));
        this.idTokenSubject.next(authResult.idToken);
      });
    });
  }

  public get authenticated() {
    return tokenNotExpired();
  };

  public get idToken() {
    return this.idTokenSubject.asObservable();
  };

  public get userProfile() {
    try { return JSON.parse(localStorage.getItem('user_profile')); } catch(e) { return {}; }
  }

  public login() {
    this.lock.show();
  };

  public logout() {
    this.dispatcher.next(new LogoutAction());
  };

}
