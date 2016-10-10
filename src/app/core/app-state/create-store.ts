import { compose } from '@ngrx/core/compose';
import { StoreModule, combineReducers } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import {
  auth,
  map
} from './reducers';

let rootReducer = compose(
  localStorageSync(['auth'], true),
  combineReducers
)({
  auth,
  map
});

export function createStore() {
  return StoreModule.provideStore(rootReducer);
}
