import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {
  EventListComponent,
  EventCreateComponent,
  EventDetailComponent,
  EventSearchComponent
} from './events';

const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/events',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/events',
        pathMatch: 'full'
      },
      {
        path: 'events',
        component: EventListComponent
      },
      {
        path: 'events/new',
        component: EventCreateComponent
      },
      {
        path: 'events/search',
        component: EventSearchComponent
      },
      {
        path: 'events/:id',
        component: EventDetailComponent
      }
    ]
  }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
