import { Profile } from '@services/profile/profile-interfaces';

export class UserProfile implements Profile {
  public id: number;
  public email: string;
  public username?: string;
  public birth?: string;
  public telephone?: number | string;
  public country?: string;
  public description?: string;

  constructor(userProfile: Profile) {
    this.id = userProfile.id;
    this.email = userProfile.email;
    this.username = userProfile.username ? userProfile.username : '';
    this.birth = userProfile.birth ? userProfile.birth : '';
    this.telephone = userProfile.telephone ? userProfile.telephone : '';
    this.country = userProfile.country ? userProfile.country : '';
    this.description = userProfile.description ? userProfile.description : '';

    this.email = userProfile.email;
    this.username = userProfile.username;
    this.birth = userProfile.birth;
    this.telephone = userProfile.telephone;
    this.country = userProfile.country;
    this.description = userProfile.description;
  }
}
