import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { UserBoard } from '@services/board-list/board-list-interfaces';
import { UserService } from '@services/user-service/user.service';

@Injectable()
export class BoardListService {
  constructor(private http: HttpClient, private user: UserService) { }

  getBoardList() {
    const params = new HttpParams()
      .set('userId', String(this.user.getUserId()));
    return this.http.get<UserBoard[]>(`${environment.url}/people_boards`, {params});
  }
}
