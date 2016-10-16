import {
  CLEAR_SELECTED_MAP_POINT,
  ClearSelectedMapPointAction,
  SELECT_MAP_POINT,
  SelectMapPointAction,
  SET_MAP_CENTER,
  SetMapCenterAction,
} from '../actions';

declare const mapboxgl: any;

const LngLat = mapboxgl.LngLat;

type Action =
  ClearSelectedMapPointAction |
  SelectMapPointAction |
  SetMapCenterAction;

export interface MapState {
  center: mapboxgl.LngLat,
  selectedPoint: mapboxgl.LngLat | null
}

const initialState = {
  center: new LngLat(-105.0, 38.0),
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
    default: {
      return state;
    }
  }
}
