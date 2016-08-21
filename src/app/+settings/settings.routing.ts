import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';

const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: '/settings/profile'
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

export const settingsRouting = RouterModule.forChild(settingsRoutes);
