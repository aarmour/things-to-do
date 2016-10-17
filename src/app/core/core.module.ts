import {
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { ApiHttpService } from './api-http.service';
import { AuthService } from './auth.service';
import { ApiEffects, EventsEffects, PlacesEffects } from './app-state';
import { State, rootReducer } from './app-state/reducers';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.run(ApiEffects),
    EffectsModule.run(EventsEffects),
    EffectsModule.run(PlacesEffects),
    SharedModule,
    StoreModule.provideStore(rootReducer)
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    {
      provide: ApiHttpService,
      useFactory: (http: Http, store: Store<State>) =>
        new ApiHttpService(http, store.select('auth')
          .map((auth: any) => auth.user || {})
          .map((user: any) => user.idToken)),
      deps: [Http, Store]
    },
    AuthService
  ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
    }
  }

}
