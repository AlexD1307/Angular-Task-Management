import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private auth: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    if (this.auth.isAuthenticated()) {
      const request = req.clone({
        setHeaders: {Authorization:  `Bearer ${localStorage.token}`}
      });

      return next.handle(request)
        .pipe(finalize(() => this.spinner.hide()));
    } else {
      this.auth.logout();
      this.spinner.hide();
    }
  }
}
