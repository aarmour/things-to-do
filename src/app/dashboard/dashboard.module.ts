import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { dashboardRouting } from './dashboard.routing';
import {
  EventCreateComponent,
  EventListComponent,
  EventDetailComponent,
  EventSearchComponent
} from './events';
import { MapboxModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    MapboxModule,
    dashboardRouting
  ],
  declarations: [
    DashboardComponent,
    EventCreateComponent,
    EventListComponent,
    EventDetailComponent,
    EventSearchComponent
  ]
})
export class DashboardModule {}
