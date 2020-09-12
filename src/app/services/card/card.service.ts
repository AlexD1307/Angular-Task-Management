import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@src/environments/environment';
import { Card } from '@services/board/board-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardId: number;

  constructor(private http: HttpClient) { }

  setCardId(id) {
    this.cardId = id;
  }

  getCard(id) {
    const params = new HttpParams()
      .set('_embed', 'comments');
    return this.http.get<Card>(`${environment.url}/cards/${id}`, {params});
  }

  addComment(cardId, text) {
    return this.http.post<Comment>(`${environment.url}/comments`, {cardId, text});
  }

  updateCardName(cardName) {
    return this.http.patch(`${environment.url}/cards/${this.cardId}`, {cardName});
  }

  updateDescription(description) {
    return this.http.patch(`${environment.url}/cards/${this.cardId}`, {description});
  }
}
