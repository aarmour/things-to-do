import { Observable } from 'rxjs/Observable';

import {
  CLEAR_SELECTED_MAP_POINT, ClearSelectedMapPointAction,
  SELECT_MAP_POINT, SelectMapPointAction,
  SET_MAP_CENTER, SetMapCenterAction,
  SET_MAP_VIEW, SetMapViewAction
} from '../actions';

declare const mapboxgl: any;

const LngLat = mapboxgl.LngLat;

type Action =
  ClearSelectedMapPointAction |
  SelectMapPointAction |
  SetMapCenterAction |
  SetMapViewAction;

export interface MapState {
  center: mapboxgl.LngLat,
  zoom: number,
  selectedPoint: mapboxgl.LngLat | null
}

const initialState = {
  center: new LngLat(-105.0, 38.0),
  zoom: 13,
  selectedPoint: null
};

export function map(state = initialState, action: Action): MapState {
  switch(action.type) {
    case CLEAR_SELECTED_MAP_POINT:
      return Object.assign({}, state, { selectedPoint: null });
    case SELECT_MAP_POINT:
      return Object.assign({}, state, { selectedPoint: action.payload });
    case SET_MAP_CENTER:
      return Object.assign({}, state, { center: action.payload });
    case SET_MAP_VIEW:
      return Object.assign({}, state, { center: action.payload.center, zoom: action.payload.zoom });
    default: {
      return state;
    }
  }
}

/**
 * Selectors
 */

export function getSelectedMapPoint(state: Observable<MapState>) {
  return state.select(state => state.selectedPoint);
}
