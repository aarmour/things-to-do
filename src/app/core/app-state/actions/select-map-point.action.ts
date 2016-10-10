import { Action } from '@ngrx/store';
import { type } from '../util';

export const SELECT_MAP_POINT = type('select map point');

export class SelectMapPointAction implements Action {

  type = SELECT_MAP_POINT;

  constructor(public payload: mapboxgl.LngLat) {}

}
