import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { dashboardRouting } from './dashboard.routing';
import {
  EventCreateComponent,
  EventListComponent,
  EventDetailComponent,
  EventSearchComponent
} from './events';
import { EventSummaryComponent } from './events/shared/event-summary/event-summary.component';
import { SharedModule } from '../shared';
import { ToolbarComponent } from './shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    dashboardRouting
  ],
  declarations: [
    DashboardComponent,
    EventCreateComponent,
    EventDetailComponent,
    EventListComponent,
    EventSearchComponent,
    EventSummaryComponent,
    ToolbarComponent,
  ]
})
export class DashboardModule {}
