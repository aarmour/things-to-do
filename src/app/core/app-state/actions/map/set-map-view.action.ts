import { Action } from '@ngrx/store';

import { type } from '../../util';

interface MapView {
  center: mapboxgl.LngLat,
  zoom: number
}

export const SET_MAP_VIEW = type('set map view');

export class SetMapViewAction implements Action {

  type = SET_MAP_VIEW;

  constructor(public payload: MapView) {}

}
