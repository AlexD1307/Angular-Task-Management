import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleInterceptor implements HttpInterceptor{
  constructor(private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone();
    const handle = next.handle(request);
    if (handle) {
      return handle.pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            this.snackBar.open(error.message, 'close', {duration: 3000});
          }
          return throwError(error);
        })
      );
    }
  }
}
