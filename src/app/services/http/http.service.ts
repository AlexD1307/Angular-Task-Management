import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`${environment.url}/countries`)
  }

  saveProfile({username, birth, country, telephone, description}) {
    const id = JSON.parse(localStorage.user).id;
    const body = {username, birth, country, telephone, description};

    return this.http.patch(`${environment.url}/users/${id}`, body)
  }
}
