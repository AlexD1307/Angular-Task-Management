import { Observable } from 'rxjs';
import { IUser } from '@services/profile/profile-interfaces';

export interface AuthCache {
  user?: Observable<IUser>;
}

export interface AuthResponse {
  accessToken: string;
  ok: boolean;
}

export interface UserAuthorization {
  email: string;
  username?: string;
  password: string;
}
