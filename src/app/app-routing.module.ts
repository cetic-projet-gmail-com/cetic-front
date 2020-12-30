import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditActivitiesComponent } from './activities/edit-activities/edit-activities.component';
import { ListActivitiesComponent } from './activities/list-activities/list-activities.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ForgotPassComponent } from './login/forgot-pass/forgot-pass.component';
import { InfoComponent } from './login/info/info.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo:  'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'forgot_password',
    component: ForgotPassComponent,
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'administration',
    canActivate: [AuthGuardService],

    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            component: ListUserComponent
          },
          {
            path: ':id',
            component: EditUserComponent
          }
        ]
      },
      {
        path: 'activities',
        children: [
          {
            path: '',
            component: ListActivitiesComponent,
          },
                    {
            path: ':id',
            component: EditActivitiesComponent
          }
        ]
      },

    ]
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
