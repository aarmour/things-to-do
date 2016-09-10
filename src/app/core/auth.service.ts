import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

declare const Auth0Lock: any;

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

  constructor() {
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    this.lock.show();
  };

  public authenticated() {
    return tokenNotExpired();
  };

  public logout() {
    localStorage.removeItem('id_token');
  };

}
