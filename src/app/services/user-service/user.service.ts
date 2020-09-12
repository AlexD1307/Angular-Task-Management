import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private auth: AuthService) { }

  getUserId() {
    if (localStorage.id) {
      return +localStorage.id;
    }
    this.auth.logout();
  }
}
