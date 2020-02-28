import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';
import { ActivitiesComponent } from './core/component/activities/activities.component';
import { LoginComponent } from './core/authentification/login/login.component';
import { ProfilComponent } from './core/component/profil/profil.component';
import { AdminUsersComponent } from './core/component/admin-users/admin-users.component';
import { InfoComponent } from './core/component/info/info.component';
import { HomeComponent } from './core/component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService} from './core/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'home',
    component : HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'administration/users',
    component: AdminUsersComponent
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuardService] 
  },
  {
    path: 'administration/activities',
    component: ActivitiesComponent
  },
  {
    path: 'forgot_password',
    component: ForgotPasswordComponent
  },




];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
