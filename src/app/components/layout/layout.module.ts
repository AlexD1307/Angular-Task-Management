import { NgModule } from '@angular/core';
import { ProfileComponent } from '@components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BoardListComponent } from '@components/board-list/board-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddBoardDialogComponent } from '@components/board-list/add-board-dialog/add-board-dialog.component';
import { SharedModule } from '@app/sharing/sharing.module';
import { routes } from '@components/layout/layout-routing';
import { ErrorHandleInterceptor } from '@services/error-handle-interceptor/error-handle-interceptor.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardComponent } from '@components/board/board.component';
import { ColumnComponent } from '@components/board/column/column.component';
import { SortPipe } from '@app/pipes/sort.pipe';
import { FocusableDirective } from '@app/directives/focusable.directive';
import { EditableTextComponent } from '@components/editable-text/editable-text.component';
import { ViewModeDirective } from '@app/directives/view-mode.directive';
import { EditModeDirective } from '@app/directives/edit-mode.directive';
import { EditableOnEnterDirective } from '@app/directives/editable-on-enter.directive';
import { CardComponent } from '@components/board/column/card/card.component';
import { CardService } from '@services/card/card.service';
import { MatDividerModule } from '@angular/material/divider';
import { AddBoardService } from '@services/add-board/add-board.service';
import { ProfileService } from '@services/profile/profile.service';
import { BoardListService } from '@services/board-list/board-list.service';
import { BoardService } from '@services/board/board.service';
import { AuthInterceptor } from '@services/auth-interceptor/auth-interceptor.service';
import { CountryService } from '@services/countries/country.service';

@NgModule({
  declarations: [
    ProfileComponent,
    BoardListComponent,
    AddBoardDialogComponent,
    BoardComponent,
    ColumnComponent,
    SortPipe,
    FocusableDirective,
    ViewModeDirective,
    EditModeDirective,
    EditableTextComponent,
    EditableOnEnterDirective,
    CardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatDialogModule,
    MatDividerModule,
    SharedModule,
    DragDropModule,
  ],
  providers: [
    ProfileService,
    BoardListService,
    BoardService,
    CountryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandleInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [AddBoardDialogComponent]
})
export class LayoutModule { }
