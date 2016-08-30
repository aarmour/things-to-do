import { Routes, RouterModule } from '@angular/router';

import { StyleguideComponent } from './styleguide.component';

const styleguideRoutes: Routes = [
  {
    path: '',
    component: StyleguideComponent
  }
];

export const styleguideRouting = RouterModule.forChild(styleguideRoutes);
