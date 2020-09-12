export interface UserBoard {
  id: number;
  userId: number;
  boardId: number;
  title: string;
  bgColor: BgColor;
}

export interface BgColor {
  id: number;
  value: string;
}

export interface Board {
  id: number;
  title: string;
  bgColorId: number;
  bgColor?: BgColor;
}
