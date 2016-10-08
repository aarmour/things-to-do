import { Component } from '@angular/core';
import { Observer } from 'rxjs/Observer';

import { environment } from '../environments/environment';
import { setMapboxAccessToken } from './shared';

@Component({
  selector: 'ttd-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor() {
    setMapboxAccessToken(environment.mapbox.accessToken);
  }

}
