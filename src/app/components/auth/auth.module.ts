import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@app/sharing/sharing.module';
import { AuthService } from '@services/auth/auth.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
