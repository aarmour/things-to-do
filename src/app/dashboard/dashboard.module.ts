import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { dashboardRouting } from './dashboard.routing';
import {
  EventListComponent,
  EventDetailComponent
} from './events';
import { SearchComponent } from './search';

@NgModule({
  imports: [
    CommonModule,
    dashboardRouting
  ],
  declarations: [
    DashboardComponent,
    EventListComponent,
    EventDetailComponent,
    SearchComponent
  ]
})
export class DashboardModule {}
