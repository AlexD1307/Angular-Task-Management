import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '@components/header/header.component';

import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { SharedModule } from './sharing/sharing.module';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatToolbarModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [
    CustomPreloadingStrategy,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
