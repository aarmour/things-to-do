import { Action } from '@ngrx/store';
import { type } from '../util';

export const CLEAR_SELECTED_MAP_POINT = type('clear selected map point');

export class ClearSelectedMapPointAction implements Action {

  type = CLEAR_SELECTED_MAP_POINT;

  constructor() {}

}
