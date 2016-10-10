import { User } from './user.model';

export interface AuthState {
  authenticated: boolean,
  user: User | null
}

export interface MapState {
  center: mapboxgl.LngLat,
  selectedPoint: mapboxgl.LngLat | null
}

export interface AppState {
  auth: AuthState,
  map: MapState
}
