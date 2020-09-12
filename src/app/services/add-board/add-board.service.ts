import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BgColor, Board } from '@services/board-list/board-list-interfaces';
import { environment } from '@src/environments/environment';
import { UserService } from '@services/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AddBoardService {

  constructor(private http: HttpClient, private user: UserService) { }

  getBoardBgColors() {
    return this.http.get<BgColor[]>(`${environment.url}/bgColors`);
  }

  createBoard(title, bgColorId) {
    return this.http.post<Board>(`${environment.url}/boards`, {title, bgColorId});
  }

  addBoardToUser({id, title, bgColorId}) {
    const userId = this.user.getUserId();

    return this.http.post(
      `${environment.url}/people_boards`,
      {boardId: id, userId, title, bgColorId}
      );
  }
}
