import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'settings',
    loadChildren: 'app/+settings/settings.module#SettingsModule'
  },
  {
    path: 'styleguide',
    loadChildren: 'app/+styleguide/styleguide.module#StyleguideModule'
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
