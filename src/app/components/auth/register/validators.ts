import { AbstractControl } from '@angular/forms';

export function passValidator(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const cnfpassValue = control.value;
    const passControl = control.root.get('password');
    if (passControl) {
      const passValue = passControl.value;
      if (passValue !== cnfpassValue || passValue === '') {
        return {
          match: true
        };
      }
    }
  }
  return null;
}


export function formErrorMessage(formControl: AbstractControl): string {
  if (formControl.hasError('required')) {
    return 'You must enter a value';
  }
  if (formControl.hasError('email')) {
    return 'You must enter a valid email address';
  }
  if (formControl.hasError('match')) {
    return 'Password must match';
  }
  if (formControl.errors.minlength) {
    return 'Password should contain at least 6 symbols';
  }

  return 'Something gone wrong';
}
