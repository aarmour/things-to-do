import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleguideComponent } from './styleguide.component';
import { styleguideRouting } from './styleguide.routing';

@NgModule({
  imports: [
    CommonModule,
    styleguideRouting
  ],
  declarations: [
    StyleguideComponent
  ]
})
export class StyleguideModule {}
