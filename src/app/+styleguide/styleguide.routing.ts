import { Routes, RouterModule } from '@angular/router';

import { StyleguideComponent } from './styleguide.component';
import { ComponentsComponent } from './components';

const styleguideRoutes: Routes = [
  {
    path: '',
    component: StyleguideComponent,
    children: [
      {
        path: 'components',
        component: ComponentsComponent
      }
    ]
  }
];

export const styleguideRouting = RouterModule.forChild(styleguideRoutes);
