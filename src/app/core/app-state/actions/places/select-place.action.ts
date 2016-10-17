import { Action } from '@ngrx/store';

import { type } from '../../util';

export const SELECT_PLACE = type('select place');

export class SelectPlaceAction implements Action {

  type = SELECT_PLACE;
  payload: string;

  constructor(public point: mapboxgl.LngLat) {
    this.payload = point.toString();
  }

}
