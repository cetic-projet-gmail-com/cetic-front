import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './core/services/auth/auth-guard.service';

import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./home/home-routing.module').then(
        (module) => module.HomeRoutingModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./admin/admin-routing.module').then(
        (module) => module.AdminRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
