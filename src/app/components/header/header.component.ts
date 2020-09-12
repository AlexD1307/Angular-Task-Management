import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { environment } from '@src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public avatar: string;
  public sub = new Subscription();

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    this.sub.add(
      this.auth.avatar$
        .subscribe(avatar => {
          if (!avatar) return;
          this.avatar = `${environment.url}/static/${avatar}`;
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get isLogged() {
    return this.auth.isAuthenticated();
  }
}
