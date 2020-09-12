import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card, Column, UpdateCardData } from '@services/board/board-interfaces';
import { FormControl, Validators } from '@angular/forms';
import { BoardService } from '@services/board/board.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CardComponent } from '@components/board/column/card/card.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  @Output() dropColumnId = new EventEmitter();
  public columnNameControll: FormControl;
  public addCardField = '';

  constructor(private boardService: BoardService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.columnNameControll = new FormControl(this.column.columnName, Validators.required);
  }

  showCard(cardId) {
    const dialogRef = this.dialog.open(CardComponent, {data: cardId, autoFocus: false});

    dialogRef.afterClosed().subscribe((updateCardData: UpdateCardData) => {
      if (updateCardData) {
        const card = this.column.cards.find(item => item.id === updateCardData.id);
        card.cardName = updateCardData.name;
      }
    });
  }

  updateColumnName() {
    if (this.columnNameControll.valid && this.columnNameControll.value !== this.column.columnName) {
      this.boardService.updateColumnName(this.column.id, this.columnNameControll.value)
        .subscribe((column: Column) => this.column.columnName = column.columnName);
    }
  }

  addCard() {
    if (this.addCardField && this.addCardField.trim() !== '') {
      this.boardService.addCard(this.column.id, this.addCardField, this.column.cards.length)
        .subscribe((card: Card) => this.column.cards.push(card));
    }
    this.addCardField = '';
  }

  dragCard(event: CdkDragDrop<any>) {
    if (
      event.previousContainer === event.container
      && event.previousIndex === event.currentIndex
      || event.currentIndex > event.container.data.length
    ) {
      return;
    } else if (event.previousContainer === event.container) {
      this.boardService.dragCardIndex(
        this.column.id,
        event.previousIndex,
        event.currentIndex
      ).subscribe();
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const previousContainerId = +event.previousContainer.element.nativeElement.offsetParent.id;
      const currentContainerId = +event.container.element.nativeElement.offsetParent.id;
      this.boardService.dragCardColumn(
        previousContainerId,
        currentContainerId,
        event.previousIndex,
        event.currentIndex
      ).subscribe();

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropColumn() {
    this.boardService.dropColumn(this.column.id).subscribe(() => this.dropColumnId.emit(this.column.id));
  }
}

