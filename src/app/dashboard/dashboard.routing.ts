import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SearchComponent } from './search/search.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent
      }
    ]
  }
];

export const dashboardRouting = RouterModule.forChild(dashboardRoutes);
