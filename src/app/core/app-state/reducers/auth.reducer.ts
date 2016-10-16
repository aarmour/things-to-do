import { User } from '../models/user.model';
import {
  LOGIN_SUCCESS,
  LoginSuccessAction,
  LOGOUT,
  LogoutAction
} from '../actions';

type Action =
  LoginSuccessAction |
  LogoutAction;

export interface AuthState {
  authenticated: boolean,
  user: User | null
}

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
