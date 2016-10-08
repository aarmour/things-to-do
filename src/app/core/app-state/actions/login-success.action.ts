import { User, UserProfile } from '../app-state';

export class LoginSuccessAction {

  constructor(public idToken: string, public userProfile: UserProfile) {}

}
