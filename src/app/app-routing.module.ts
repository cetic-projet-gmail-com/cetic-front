import { ErrorComponent } from './core/component/error/error.component';
import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';
import { LoginComponent } from './core/authentification/login/login.component';
import { ProfilComponent } from './core/component/profil/profil.component';
import { AdminUsersComponent } from './core/component/admin-users/admin-users.component';
import { InfoComponent } from './core/component/info/info.component';
import { HomeComponent } from './core/component/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/auth/auth-guard.service';
import { EditUserComponent } from './core/component/edit-user/edit-user.component';
import { EditActivityComponent } from './core/component/editactivity/editactivity.component';
import { UpdateDepartementComponent } from './core/component/modal/update-departement/update-departement.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: [AuthGuardService]? 'home': 'login', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
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
    path: 'administration/users/edit',
    component: ProfilComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'administration/users/:id',
    component: EditUserComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'administration/users', pathMatch: 'full',
    component: AdminUsersComponent,
    canActivate: [AuthGuardService]

  },

  {
    path: 'administration/departement/:id',
    component: UpdateDepartementComponent,
    canActivate: [AuthGuardService]

  },

  {
    path: 'administration/departement',
    component: AdminUsersComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'administration/activities/:id',
    component: EditActivityComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'administration/activities',
    component: AdminUsersComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: 'forgot_password',
    component: ForgotPasswordComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
