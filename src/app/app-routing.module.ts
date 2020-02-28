import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';
import { LoginComponent } from './core/authentification/login/login.component';
import { ProfilComponent } from './core/component/profil/profil.component';
import { AdminUsersComponent } from './core/component/admin-users/admin-users.component';
import { InfoComponent } from './core/component/info/info.component';
import { HomeComponent } from './core/component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditActivityComponent } from './core/component/editactivity/editactivity.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
    path: 'administration/users/edit',
    component: ProfilComponent
  },
  {
    path: 'administration/departement',
    component: AdminUsersComponent
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'administration/activities',
    component: AdminUsersComponent
  },
  {
    path: 'administration/activities/edit/taches',
    component: EditActivityComponent
  },

  {
    path: 'administration/activities/edit/users',
    component: EditActivityComponent
  },

  {
    path: 'forgot_password',
    component: ForgotPasswordComponent
  }



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
