export interface Profile {
  id: number;
  email: string;
  avatar?: string;
  username?: string;
  birth?: string;
  telephone?: string | number;
  country?: string;
  description?: string;
}

export interface IUser {
  id: number;
  username: string;
  avatar?: string;
}
