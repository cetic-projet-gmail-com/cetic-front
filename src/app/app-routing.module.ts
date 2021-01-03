import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AuthGuard,
  AuthGuardAdmin,
} from './core/services/auth/auth-guard.service';

import { LoginComponent } from './auth/login/login.component';
import { InfosComponent } from './auth/infos/infos.component';

const routes: Routes = [
  {
    path: 'info',
    component: InfosComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home/home-routing.module').then(
        (module) => module.HomeRoutingModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AuthGuardAdmin],
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
