import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from "@services/auth-interceptor/auth-interceptor.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatOptionModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatOptionModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
})
export class SharedModule { }
