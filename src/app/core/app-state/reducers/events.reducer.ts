import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import {
  FETCH_EVENT,
  FETCH_EVENT_FAIL,
  FETCH_EVENT_SUCCESS,
  SELECT_EVENT_SUCCESS,
  FetchEventAction,
  FetchEventFailAction,
  FetchEventSuccessAction,
  SelectEventSuccessAction
} from '../actions';
import { Event } from '../models/event.model';

type Action =
  FetchEventAction |
  FetchEventFailAction |
  FetchEventSuccessAction |
  SelectEventSuccessAction;

export interface EventMetadataState {
  isLoading: boolean,
  fetchFailed: boolean
}

export interface EventsState {
  ids: Set<string>,
  entities: { [id: string]: Event },
  entityMetadata: { [id: string]: EventMetadataState },
  selectedEventId: string | null
}

const initialState = {
  ids: new Set<string>(),
  entities: {},
  entityMetadata: {},
  selectedEventId: null
};

export function events(state = initialState, action: Action) {
  switch(action.type) {
    case FETCH_EVENT: {
      const id = action.payload;

      const ids = new Set(state.ids);
      ids.add(id);

      const entityMetadata = {
        isLoading: true,
        fetchFailed: false
      };

      return {
        ids,
        entities: state.entities,
        entityMetadata: Object.assign({}, state.entityMetadata, { [id]: entityMetadata }),
        selectedEventId: state.selectedEventId
      };
    }

    case FETCH_EVENT_SUCCESS: {
      const newId = action.payload.id;

      const entityMetadata = {
        isLoading: false,
        fetchFailed: false
      };

      return {
        ids: state.ids,
        entities: Object.assign({}, state.entities, { [newId]: action.payload }),
        entityMetadata: Object.assign({}, state.entityMetadata, { [newId]: entityMetadata }),
        selectedEventId: state.selectedEventId
      };
    }

    case FETCH_EVENT_FAIL: {
      const entityMetadata = {
        isLoading: false,
        fetchFailed: true
      };

      return {
        ids: state.ids,
        entities: state.entities,
        entityMetadata: Object.assign({}, state.entityMetadata, { [action.payload]: entityMetadata }),
        selectedEventId: state.selectedEventId
      };
    }

    case SELECT_EVENT_SUCCESS: {
      return {
        ids: state.ids,
        entities: state.entities,
        entityMetadata: state.entityMetadata,
        selectedEventId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Selectors
 */

export function getEventEntities(state: Observable<EventsState>) {
  return state.select(state => state.entities);
}

export function getEventEntityMetadata(state: Observable<EventsState>) {
  return state.select(state => state.entityMetadata);
}

export function getEventIds(state: Observable<EventsState>) {
  return state.select(state => state.ids);
}

export function getSelectedEventId(state: Observable<EventsState>) {
  return state.select(state => state.selectedEventId);
}

export function getSelectedEvent(state: Observable<EventsState>) {
  return combineLatest<{ [id: string]: Event }, string>(
    state.let(getEventEntities),
    state.let(getSelectedEventId)
  )
  .map(([entities, selectedEventId]) => entities[selectedEventId]);
}

export function getSelectedEventMetadata(state: Observable<EventsState>) {
  return combineLatest<{ [id: string]: EventMetadataState }, string>(
    state.let(getEventEntityMetadata),
    state.let(getSelectedEventId)
  )
  .map(([entityMetadata, selectedEventId]) => entityMetadata[selectedEventId]);
}
