import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Board } from '@services/board-list/board-list-interfaces';
import { Column } from '@services/board/board-interfaces';

@Injectable()
export class BoardService {
  private boardId;

  constructor(private http: HttpClient) { }

  getBoard() {
    return this.http.get<Board>(`${environment.url}/boards/${this.boardId}`);
  }

  getColumns() {
    const params = new HttpParams()
      .set('boardId', this.boardId)
      .set('_embed', 'cards');

    return this.http.get<Column[]>(`${environment.url}/columns`, {params});
  }

  updateColumnName(columnId, columnName) {
    return this.http.patch(`${environment.url}/columns/${columnId}`, {columnName});
  }

  addColumn(columnName, orderIndex) {
    return this.http.post(`${environment.url}/columns`, {
      boardId: this.boardId,
      columnName,
      orderIndex,
      cards: []
    });
  }

  setBoardId(boardId) {
    this.boardId = boardId;
  }

  addCard(columnId, cardName, orderIndex) {
    return this.http.post(`${environment.url}/cards`, {columnId, cardName, orderIndex});
  }

  dragCardColumn(previousColumnId, currentColumnId, previousIndex, currentIndex) {
    return this.http.post(
      `${environment.url}/drag-card-column`,
      {previousColumnId, currentColumnId, previousIndex, currentIndex}
    );
  }

  dragCardIndex(columnId, previousIndex, currentIndex) {
    return this.http.post(
      `${environment.url}/drag-card-index`,
      {columnId, previousIndex, currentIndex}
    );
  }

  dragColumn(previousIndex, currentIndex) {
    return this.http.post(
      `${environment.url}/drag-column`,
      {boardId: this.boardId, previousIndex, currentIndex}
    );
  }

  dropColumn(id) {
    return this.http.delete(`${environment.url}/columns/${id}`);
  }

}
