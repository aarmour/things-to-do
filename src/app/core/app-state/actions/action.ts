import { LoginAction } from './login.action';
import { LogoutAction } from './logout.action';

// Export the Action type, which is a union of all actions and represents
// everything that the application can do.
export type Action =
  LoginAction |
  LogoutAction
;
