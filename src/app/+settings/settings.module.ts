import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';
import { settingsRouting } from './settings.routing';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    settingsRouting
  ],
  declarations: [
    SettingsComponent,
    ProfileComponent
  ]
})
export class SettingsModule {}
