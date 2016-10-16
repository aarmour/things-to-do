import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AuthService, LoginSuccessAction, State } from './core';
import { setMapboxAccessToken } from './shared';

@Component({
  selector: 'ttd-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private store: Store<State>
  ) {
    setMapboxAccessToken(environment.mapbox.accessToken);

    authService.authenticated.subscribe((user) => this.store.dispatch(new LoginSuccessAction(user)));
  }

}
