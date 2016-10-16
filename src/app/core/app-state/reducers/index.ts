import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AuthState, auth } from './auth.reducer';
import { EventsState, events } from './events.reducer';
import * as fromEvents from './events.reducer';
import { MapState, map } from './map.reducer';

export interface State {
  auth: AuthState,
  events: EventsState,
  map: MapState
}

const reducers = {
  auth,
  events,
  map
};

// TODO: create separate development and production reducers
const reducer = compose(localStorageSync(['auth'], true), combineReducers)(reducers);

export function rootReducer(state: any, action: any) {
  return reducer(state, action);
}

/**
 * Selectors
 */

export function getEventsState(state: Observable<State>) {
  return state.select(state => state.events);
}

export const getEventEntities = compose(fromEvents.getEventEntities, getEventsState);
export const getEventIds = compose(fromEvents.getEventIds, getEventsState);
export const getSelectedEvent = compose(fromEvents.getSelectedEvent, getEventsState);
export const getSelectedEventMetadata = compose(fromEvents.getSelectedEventMetadata, getEventsState);
