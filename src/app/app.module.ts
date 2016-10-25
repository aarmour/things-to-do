import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

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
    appRoutingProviders,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(titleService: Title, router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const title = this.getTitle(router.routerState, router.routerState.root).join(' - ');
        titleService.setTitle(title);
      }
    });
  }

  getTitle(state, parent) {
    const data = [];

    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }

    if (!data.length) data.push('Things to Do');

    return data;
  }

}
