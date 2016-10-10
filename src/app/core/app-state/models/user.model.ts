import { UserProfile } from './user-profile.model';

export interface User {
  idToken: string,
  profile: UserProfile
}
