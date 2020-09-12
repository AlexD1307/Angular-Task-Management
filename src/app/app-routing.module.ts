import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@components/layout/layout.module')
      .then((m => m.LayoutModule)),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('@components/auth/auth.module')
      .then(m => m.AuthModule),
    data: {
      nopreload: true
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingStrategy})
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
