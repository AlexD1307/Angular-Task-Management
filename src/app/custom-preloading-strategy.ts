import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if ( route.data && route.data.noreload ) {
      return of(null);
    }

    return of(true);
  }
}
