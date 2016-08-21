import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';

// TODO: switch to static bootstrapping with the Ahead-Of-Time (AOT) compiler
// once angular-cli supports it.
platformBrowserDynamic().bootstrapModule(AppModule);
