import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public hidePassword = true;
  public loggedErrorMessage: string;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe(() => this.router.navigate(['']),
        error => {
          if (typeof error.error === 'string') {
            this.loggedErrorMessage = error.error;
          } else {
            this.loggedErrorMessage = error.message;
          }
        });
    }
  }

  toggleVisibilityPassword() {
    this.hidePassword = !this.hidePassword;
  }
}
