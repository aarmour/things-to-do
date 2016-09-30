import {
  ModuleWithProviders,
  NgModule,
  OpaqueToken,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { APP_STATE_PROVIDERS, dispatcher } from './app-state';
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
  ]
})
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
    }
  }

}
