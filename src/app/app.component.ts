import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppState } from './core/app-state/models/app-state.model';
import { AuthService, LoginSuccessAction } from './core';
import { setMapboxAccessToken } from './shared';

@Component({
  selector: 'ttd-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    setMapboxAccessToken(environment.mapbox.accessToken);

    authService.authenticated.subscribe((user) => this.store.dispatch(new LoginSuccessAction(user)));
  }

}
