import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<string[]>(`${environment.url}/countries`);
  }
}
