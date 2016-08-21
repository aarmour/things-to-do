import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';
import { settingsRouting } from './settings.routing';

@NgModule({
  imports: [
    CommonModule,
    settingsRouting
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {}
