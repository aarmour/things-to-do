import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { CoreModule } from './core';
import { DashboardModule } from './dashboard';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    DashboardModule,
    routing,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
