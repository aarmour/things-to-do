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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AutocompleteComponent,
    GeocoderComponent,
    InfoPopupContentComponent,
    InfoPopupComponent,
    MapComponent
  ],
  providers: [
    GeocoderService
  ],
  exports: [
    AutocompleteComponent,
    GeocoderComponent,
    InfoPopupContentComponent,
    InfoPopupComponent,
    MapComponent
  ]
})
export class SharedModule { }

// TODO: fix once mapbox-gl supports SystemJS
// import mapboxgl = require('mapbox-gl');
declare const mapboxgl: any;

export function setMapboxAccessToken(token: string) {
  mapboxgl.accessToken = token;
}
