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
        component: EventListComponent,
        data: {
          title: 'Events'
        }
      },
      {
        path: 'events/new',
        component: EventCreateComponent,
        data: {
          title: 'Create a new event'
        }
      },
      {
        path: 'events/search',
        component: EventSearchComponent,
        data: {
          title: 'Find an event'
        }
      },
      {
        path: 'events/:id',
        component: EventDetailComponent,
        data: {
          title: 'Details'
        }
      }
    ]
  }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
