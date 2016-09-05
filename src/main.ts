import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule, environment } from './app';
import { setMapboxAccessToken } from './app/shared';

setMapboxAccessToken(environment.mapbox.accessToken);

// TODO: switch to static bootstrapping with the Ahead-Of-Time (AOT) compiler
// once angular-cli supports it.
platformBrowserDynamic().bootstrapModule(AppModule);
