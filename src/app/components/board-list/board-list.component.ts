import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserBoard } from '@services/board-list/board-list-interfaces';
import { BoardListService } from '@services/board-list/board-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardDialogComponent } from './add-board-dialog/add-board-dialog.component';

@Component({
  selector: 'app-boards',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {
  public boards$: Observable<UserBoard[]>;
  constructor(private boardListService: BoardListService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.boards$ = this.boardListService.getBoardList();
  }

  openDialog() {
    this.dialog.open(AddBoardDialogComponent, {autoFocus: false});
  }
}
