import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '@services/user-service/user.service';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';

@Injectable()
export class ProfileService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) { }

  uploadAvatar(file: File, profile) {
    const formData = new FormData();
    formData.append('avatar', file, `${Date.now()}-${file.name}`);

    return this.http.patch(`${environment.url}/user-avatar`, formData).pipe(
      switchMap(({avatar}: {avatar: string}) => {
        this.auth.avatar$.next(avatar);
        return this.saveProfile(profile, avatar);
      })
    );
  }

  saveProfile(profile, avatar: string | null) {
    const id = this.userService.getUserId();
    if (avatar) profile.avatar = avatar;
    return this.http.patch(`${environment.url}/users/${id}`, profile);
  }

  getProfile() {
    return this.http.get(`${environment.url}/profile`).pipe(
      tap(profile => {
        if (!profile) {
          this.auth.logout();
        }
      })
    );
  }
}
