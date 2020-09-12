import { Routes } from '@angular/router';
import { ProfileComponent } from '@components/profile/profile.component';
import { BoardListComponent } from '@components/board-list/board-list.component';
import { BoardComponent } from '@components/board/board.component';

export const routes: Routes = [
  {path: '', component: BoardListComponent},
  {path: 'board/:boardId', component: BoardComponent},
  {path: 'profile', component: ProfileComponent}
];
