import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { StyleguideComponent } from './styleguide.component';
import { ComponentsComponent } from './components';
import { styleguideRouting } from './styleguide.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    styleguideRouting
  ],
  declarations: [
    StyleguideComponent,
    ComponentsComponent
  ]
})
export class StyleguideModule {}
