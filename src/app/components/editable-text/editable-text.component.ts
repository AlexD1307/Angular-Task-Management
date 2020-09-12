import { Component, ContentChild, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ViewModeDirective } from '@app/directives/view-mode.directive';
import { EditModeDirective } from '@app/directives/edit-mode.directive';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnInit, OnDestroy {
  @Output() update = new EventEmitter();
  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;
  public mode: 'view' | 'edit' = 'view';
  private sub = new Subscription();
  private editMode = new Subject();
  private editMode$ = this.editMode.asObservable();

  constructor(private host: ElementRef) { }

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    this.sub.add(fromEvent(this.element, 'click').subscribe(() => {
      this.mode = 'edit';
      this.editMode.next(true);
    }));
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    );

    this.sub.add(this.editMode$.pipe(
      switchMapTo(clickOutside$),
    ).subscribe(() => {
      this.update.next();
      this.mode = 'view';
    }));
  }

  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }
}
