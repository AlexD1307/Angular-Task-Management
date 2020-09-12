import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { passValidator, formErrorMessage } from './validators';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public formError = formErrorMessage;
  public registerErrorMessage: string;
  private sub: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, passValidator]],
    });

    this.sub.add(
      this.form.controls.password.valueChanges.subscribe(() => {
        this.form.controls.confirmPassword.updateValueAndValidity();
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  submit() {
    if (this.form.valid) {
      this.sub.add(
        this.auth.register(this.form.value).subscribe(() => this.router.navigate(['']),
         error => this.registerErrorMessage = error.error),
      );
    }
  }
}
