import { Directive, HostListener } from '@angular/core';
import { EditableTextComponent } from '@components/editable-text/editable-text.component';

@Directive({
  selector: '[editableOnEnter]'
})
export class EditableOnEnterDirective {
  constructor(private editable: EditableTextComponent) { }

  @HostListener('keyup.enter')
  onEnter() {
    this.editable.toViewMode();
  }
}
