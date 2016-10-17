import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { Place } from '../models/place.model';
import {
  REVERSE_GEOCODE_POINT, ReverseGeocodePointAction,
  REVERSE_GEOCODE_POINT_SUCCESS, ReverseGeocodePointSuccessAction,
  SELECT_PLACE, SelectPlaceAction
} from '../actions';

type Action =
  ReverseGeocodePointAction |
  ReverseGeocodePointSuccessAction |
  SelectPlaceAction;

export interface PlacesState {
  ids: Set<string>,
  entities: { [id: string]: Place },
  selectedPlaceId: string | null
}

const initialState = {
  ids: new Set<string>(),
  entities: {},
  selectedPlaceId: null
};

export function places(state = initialState, action: Action) {
  switch(action.type) {
    case REVERSE_GEOCODE_POINT: {
      const id = action.payload.toString();
      const ids = new Set(state.ids);
      ids.add(id);

      return {
        ids,
        entities: Object.assign({}, state.entities, { [id]: { isLoading: true } }),
        selectedPlaceId: state.selectedPlaceId
      };
    }

    case REVERSE_GEOCODE_POINT_SUCCESS: {
      const { center, geometry, placeName, text } = action.payload;
      const entity = { center, geometry, placeName, text, isLoading: false };

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [action.payload.id]: entity }),
        selectedPlaceId: state.selectedPlaceId
      };
    }

    case SELECT_PLACE: {
      return Object.assign({}, state, { selectedPlaceId: action.payload });
    }

    default: {
      return state;
    }
  }
}

/**
 * Selectors
 */

export function getPlaceEntities(state: Observable<PlacesState>) {
  return state.select(state => state.entities);
}

export function getSelectedPlaceId(state: Observable<PlacesState>) {
  return state.select(state => state.selectedPlaceId);
}

export function getSelectedPlace(state: Observable<PlacesState>) {
  return combineLatest<{ [id: string]: Place }, string>(
    state.let(getPlaceEntities),
    state.let(getSelectedPlaceId)
  )
  .map(([entities, selectedPlaceId]) => entities[selectedPlaceId]);
}
