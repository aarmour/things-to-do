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
import { PlaceInfoPopupContainerComponent } from './shared/place-info-popup-container/place-info-popup-container.component';
import { EventFormComponent } from './events/shared/event-form/event-form.component';

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
    EventFormComponent,
    EventListComponent,
    EventSearchComponent,
    EventSummaryComponent,
    PlaceInfoPopupContainerComponent,
    ToolbarComponent,
  ]
})
export class DashboardModule {}
