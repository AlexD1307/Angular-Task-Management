import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardService } from '@services/card/card.service';
import { Card } from '@services/board/board-interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  public card: Card;
  public cardName: string;
  public comments: any[];
  public description: string;
  public editingDescription = false;
  public addCommentValue: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private dialogRef: MatDialogRef<CardComponent>,
    private cardService: CardService,
    private cdRef: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.cardService.getCard(this.data).subscribe((card: Card) => {
      this.cardService.setCardId(card.id);
      this.card = card;
      this.cardName = card.cardName;
      this.description = card.description;
    });
  }

  ngOnDestroy() {
    if (this.card.cardName !== this.cardName) {
      this.dialogRef.close({
        id: this.card.id,
        name: this.cardName,
      });
    }
  }

  updateCardName() {
    this.cardService.updateCardName(this.cardName).subscribe();
  }

  addComment() {
    this.cardService.addComment(this.card.id, this.addCommentValue)
      .subscribe((comment: any) => this.card.comments.push(comment));
    this.addCommentValue = '';
  }

  updateDescription() {
    if (this.description !== this.card.description) {
      this.cardService.updateDescription(this.description).subscribe();
    }
    this.toggleEditingDeescription();
  }

  toggleEditingDeescription() {
    this.editingDescription = !this.editingDescription;
    this.cdRef.detectChanges();
  }
}
