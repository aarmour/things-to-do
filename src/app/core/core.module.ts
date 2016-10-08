import {
  Inject,
  ModuleWithProviders,
  NgModule,
  OpaqueToken,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import {
  APP_STATE_PROVIDERS,
  Action,
  AppState,
  BootstrapAction,
  dispatcher,
  state
} from './app-state';
import { EventsApiService } from './api';
import { ApiHttpService } from './api-http.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [
    ...APP_STATE_PROVIDERS,
    {
      provide: AuthService,
      useClass: AuthService,
      deps: [dispatcher]
    },
    {
      provide: ApiHttpService,
      useFactory: (http: Http, state: Observable<AppState>) => new ApiHttpService(http, state.map(s => s.auth.user.idToken)),
      deps: [Http, state]
    },
    EventsApiService,
  ]
})
export class CoreModule {

  constructor (
    @Optional() @SkipSelf() parentModule: CoreModule,
    @Inject(dispatcher) private dispatcher: Observer<Action>
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
    }

    dispatcher.next(new BootstrapAction());
  }

}
