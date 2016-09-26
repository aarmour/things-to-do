import { ClearSelectedMapPointAction } from './clear-selected-map-point.action';
import { LoginAction } from './login.action';
import { LogoutAction } from './logout.action';
import { SelectMapPointAction } from './select-map-point.action';

// Export the Action type, which is a union of all actions and represents
// everything that the application can do.
export type Action =
  ClearSelectedMapPointAction |
  LoginAction |
  LogoutAction |
  SelectMapPointAction
;
