import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeLogger } from "ngrx-store-logger";

import { environment } from '../../../../environments/environment';
import { AuthState, auth } from './auth.reducer';
import { EventsState, events } from './events.reducer';
import * as fromEvents from './events.reducer';
import { MapState, map } from './map.reducer';
import * as fromMap from './map.reducer';
import { PlacesState, places } from './places.reducer';
import * as fromPlaces from './places.reducer';

export interface State {
  auth: AuthState,
  events: EventsState,
  map: MapState,
  places: PlacesState
}

const reducers = {
  auth,
  events,
  map,
  places
};

const developmentReducer = compose(storeLogger(), localStorageSync(['auth'], true), combineReducers)(reducers);
const productionReducer = compose(localStorageSync(['auth'], true), combineReducers)(reducers);

export function rootReducer(state: any, action: any) {
  return environment.production ? productionReducer(state, action) : developmentReducer(state, action);
}

/**
 * Selectors
 */

export function getEventsState(state: Observable<State>) {
  return state.select(state => state.events);
}

export const getEventEntities = compose(fromEvents.getEventEntities, getEventsState);
export const getEventIds = compose(fromEvents.getEventIds, getEventsState);
export const getNewEventId = compose(fromEvents.getNewEventId, getEventsState);
export const getSelectedEvent = compose(fromEvents.getSelectedEvent, getEventsState);
export const getSelectedEventMetadata = compose(fromEvents.getSelectedEventMetadata, getEventsState);

export function getMapState(state: Observable<State>) {
  return state.select(state => state.map);
}

export const getSelectedMapPoint = compose(fromMap.getSelectedMapPoint, getMapState);

export function getPlacesState(state: Observable<State>) {
  return state.select(state => state.places);
}

export const getSelectedPlace = compose(fromPlaces.getSelectedPlace, getPlacesState);
