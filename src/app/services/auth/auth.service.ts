import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthCache, AuthResponse, UserAuthorization } from './auth-interfaces';
import { catchError, shareReplay, switchMap, tap } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { IUser } from '@services/profile/profile-interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public avatar$ = new Subject();
  public userName$ = new Subject();

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
  }

  private cache: AuthCache = {};

  register({email, password}: UserAuthorization) {
    if (!email || !password) return;
    return this.http.post<AuthResponse>(`${environment.url}/register`, {email, password}).pipe(
      switchMap((response: AuthResponse) => {
        this.setToken(response.accessToken);
        return this.getUser();
      }),
      tap((userData: IUser) => {
        localStorage.setItem('id', userData.id + '');
      })
    );
  }

  login(user: UserAuthorization) {
    if (!user) return;
    return this.http.post<AuthResponse>(`${environment.url}/login`, user).pipe(
      switchMap((response: AuthResponse) => {
        this.setToken(response.accessToken);
        return this.getUser();
      }),
      tap((userData: IUser) => {
        localStorage.setItem('id', userData.id + '');
      })
    );
  }

  getUser() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.token}`
    });

    if (this.cache.user) {
      return this.cache.user = this.http.get<IUser>(`${environment.url}/user`, {headers});
    }

    this.cache.user = this.http.get<IUser>(`${environment.url}/user`, {headers})
      .pipe(
        shareReplay(1),
        catchError(() => {
          delete this.cache.user;
          return EMPTY;
        })
      );

    return this.cache.user;
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
