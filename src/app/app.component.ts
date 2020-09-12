import { Component } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { IUser } from '@services/profile/profile-interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasks-management';
  constructor(private auth: AuthService) {
    if (this.auth.isAuthenticated()) {
      this.auth.getUser().subscribe((user: IUser) => {
          this.auth.avatar$.next(user.avatar);
          this.auth.userName$.next(user.username);
        });
    }
  }
}
