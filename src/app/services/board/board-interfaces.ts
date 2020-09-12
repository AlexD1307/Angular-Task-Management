export interface Column {
  id?: number;
  boardId?: number;
  columnName: string;
  orderIndex: number;
  cards?: Card[];
  background: string;
}

export interface Card {
  id: number;
  columnId: number;
  cardName: string;
  orderIndex: number;
  comments: Comment[];
  description?: string;
}

export interface UpdateCardData {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  cardId: number;
  text: string;
}
