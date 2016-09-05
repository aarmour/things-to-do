import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AutocompleteComponent } from './autocomplete';
import { GeocoderService } from './mapbox/geocoder.service';
import { MapComponent } from './mapbox/map';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AutocompleteComponent,
    MapComponent
  ],
  providers: [
    GeocoderService
  ],
  exports: [
    AutocompleteComponent,
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
