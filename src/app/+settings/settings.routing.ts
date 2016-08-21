import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';

const settingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  }
];

export const settingsRouting = RouterModule.forChild(settingsRoutes);
