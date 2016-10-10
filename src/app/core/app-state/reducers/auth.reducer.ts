import {
  LOGIN_SUCCESS,
  LoginSuccessAction,
  LOGOUT,
  LogoutAction
} from '../actions';
import { AuthState } from '../models/app-state.model';

type Action =
  LoginSuccessAction |
  LogoutAction;

const initialState = {
  authenticated: false,
  user: null
}

export function auth(state = initialState, action: Action): AuthState {
  switch(action.type) {
    case LOGIN_SUCCESS: {
      return { authenticated: true, user: action.payload };
    }

    case LOGOUT: {
      return { authenticated: false, user: null };
    }

    default: {
      return state;
    }
  }
}
