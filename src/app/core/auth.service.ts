import { Inject, Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { User } from './app-state/models/user.model';
import {
  LoginSuccessAction,
  LogoutAction
} from './app-state';

@Injectable()
export class AuthService {

  private authenticatedSubject:ReplaySubject<any> = new ReplaySubject<any>(1);

  // TODO: get client ID and domain from config
  private lock = new Auth0Lock('S4l1AdOBaXov8pYoQxegKSywBYu2nwox', 'ttd.auth0.com', {
    rememberLastLogin: false,
    auth: {
      // TODO: replace hardcoded URL
      redirectUrl: 'http://localhost:4200',
      responseType: 'id_token'
    }
  });

  constructor() {
    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) this.authenticatedSubject.error(error);
        else this.authenticatedSubject.next({
          idToken: authResult.idToken,
          profile
        } as User);
      });
    });
  }

  public get authenticated() {
    return this.authenticatedSubject.asObservable();
  }

  public login() {
    this.lock.show();
  };

}
