import { Action } from '@ngrx/store';

import { type } from '../../util';

export const SET_MAP_CENTER = type('set map center');

export class SetMapCenterAction implements Action {

  type = SET_MAP_CENTER;

  constructor(public payload: mapboxgl.LngLat) {}

}
