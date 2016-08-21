import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import {
  EventListComponent,
  EventDetailComponent
} from './events';
import { SearchComponent } from './search/search.component';

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
        redirectTo: '/dashboard/events'
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'events',
        component: EventListComponent
      },
      {
        path: 'events/:id',
        component: EventDetailComponent
      }
    ]
  }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
