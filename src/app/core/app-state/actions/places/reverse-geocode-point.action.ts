import { Action } from '@ngrx/store';

import { type } from '../../util'

export const REVERSE_GEOCODE_POINT = type('reverse geocode point');

export class ReverseGeocodePointAction implements Action {

  type = REVERSE_GEOCODE_POINT;

  constructor(public payload: mapboxgl.LngLat) {}

}

export const REVERSE_GEOCODE_POINT_SUCCESS = type('reverse geocode point success');

export class ReverseGeocodePointSuccessAction implements Action {

  type = REVERSE_GEOCODE_POINT_SUCCESS;

  constructor(public payload: any) {}
}
