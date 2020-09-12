import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '@services/board/board.service';
import { switchMap } from 'rxjs/operators';
import { Column } from '@services/board/board-interfaces';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Board } from '@services/board-list/board-list-interfaces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public columns: Column[];
  public boardName: string;
  public board: Board;
  public addingColumn = false;
  public addingColumnController = '';
  private bgColor: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    @Inject(DOCUMENT)private document: Document
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe<Column[]>(
      switchMap((params) => {
        this.boardService.setBoardId(+params.boardId);
        this.boardService.getBoard().subscribe(board => {
          this.boardName = board.title;
          this.bgColor = board.bgColor.value;
          this.document.body.classList.add(board.bgColor.value);
        });
        return this.boardService.getColumns();
      }),
    ).subscribe((columns: Column[]) => this.columns = columns);
  }

  ngOnDestroy() {
    this.document.body.classList.remove(this.bgColor);
  }

  toggleAddingColumn() {
    this.addingColumn = !this.addingColumn;
  }

  addColumn() {
    if (this.addingColumnController) {
      this.boardService.addColumn(this.addingColumnController, this.columns.length).subscribe((column: Column) => {
        this.columns.push(column);
      });
    }
    this.addingColumnController = '';
    this.toggleAddingColumn();
  }

  dragColumn(event: CdkDragDrop<string[]>) {
    if (event.currentIndex === event.previousIndex) {
      return;
    }
    this.boardService.dragColumn(event.previousIndex, event.currentIndex).subscribe();
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  dropColumn(id) {
    this.columns = this.columns.filter(column => column.id !== id);
  }
}
