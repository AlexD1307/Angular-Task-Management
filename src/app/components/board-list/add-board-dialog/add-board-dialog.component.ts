import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { AddBoardService } from '@services/add-board/add-board.service';
import { BgColor, Board } from '@services/board-list/board-list-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-board-dialog',
  templateUrl: './add-board-dialog.component.html',
  styleUrls: ['./add-board-dialog.component.scss']
})
export class AddBoardDialogComponent implements OnInit, AfterViewInit {
  public boardNameController = new FormControl('', [Validators.required]);
  public bgColors: BgColor[];
  public bgColor: BgColor;

  constructor(private addBoardService: AddBoardService, private router: Router, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.addBoardService.getBoardBgColors().subscribe(bgColors => {
      this.bgColors = bgColors;
      this.bgColor = bgColors[0];
      this.cdRef.detectChanges();
    });

  }

  createBoard() {
    if (this.boardNameController.valid) {
      this.addBoardService.createBoard(this.boardNameController.value, this.bgColor.id).pipe(
        switchMap((data: Board) => this.addBoardService.addBoardToUser(data))
      ).subscribe((data: Board) => {
        if (data) {
          this.router.navigate(['board', data.id]);
        }
      });
    }
  }
}
