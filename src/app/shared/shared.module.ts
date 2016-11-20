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
import { UserComponent } from './mapbox/control/user/user.component';
import { GeojsonSourceComponent } from './mapbox/map/geojson-source.component';
import { LayerComponent } from './mapbox/map/layer.component';

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
    SpinnerComponent,
    UserComponent,
    GeojsonSourceComponent,
    LayerComponent
  ],
  providers: [
    GeocoderService
  ],
  exports: [
    AutocompleteComponent,
    ButtonComponent,
    GeocoderComponent,
    GeojsonSourceComponent,
    IconComponent,
    InfoPopupContentComponent,
    InfoPopupComponent,
    LayerComponent,
    MapComponent,
    SpinnerComponent,
    UserComponent
  ]
})
export class SharedModule { }

// TODO: fix mapbox-gl TypeScript integration
declare const mapboxgl: any;

export function setMapboxAccessToken(token: string) {
  mapboxgl.accessToken = token;
}
