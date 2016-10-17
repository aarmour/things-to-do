import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { camelizeKeys } from 'humps';

import { GeocoderService } from '../../../shared';
import { REVERSE_GEOCODE_POINT, ReverseGeocodePointSuccessAction } from '../actions';
import { State } from '../reducers';

@Injectable()
export class PlacesEffects {

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private geocoderService: GeocoderService
  ) {}

  @Effect()
  reverseGeocodePoint = this.actions
    .ofType(REVERSE_GEOCODE_POINT)
    .switchMap(action => this.geocoderService.reverseGeocode(action.payload)
      .map(result => camelizeKeys(result))
      .map((result: any) => {
        const feature = result.features[0];

        // TODO: handle fail for no features

        return new ReverseGeocodePointSuccessAction({
          id: action.payload.toString(),
          center: feature.center,
          geometry: feature.geometry,
          placeName: feature.placeName,
          text: feature.text
        });
      })
    );
}
