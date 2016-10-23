import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AutocompleteComponent } from './autocomplete';
import {
  GeocoderComponent,
  GeocoderService,
  InfoPopupContentComponent,
  InfoPopupComponent,
  MapComponent
} from './mapbox';
import { SpinnerComponent } from './spinner/spinner.component';
import { IconComponent } from './icon/icon.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AutocompleteComponent,
    ButtonComponent,
    GeocoderComponent,
    IconComponent,
    InfoPopupContentComponent,
    InfoPopupComponent,
    MapComponent,
    SpinnerComponent
  ],
  providers: [
    GeocoderService
  ],
  exports: [
    AutocompleteComponent,
    ButtonComponent,
    GeocoderComponent,
    IconComponent,
    InfoPopupContentComponent,
    InfoPopupComponent,
    MapComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }

// TODO: fix once mapbox-gl supports SystemJS
// import mapboxgl = require('mapbox-gl');
declare const mapboxgl: any;

export function setMapboxAccessToken(token: string) {
  mapboxgl.accessToken = token;
}
