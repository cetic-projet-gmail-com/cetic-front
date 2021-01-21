import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import {
  AuthGuard,
  AuthGuardAdmin,
} from '../core/services/auth/auth-guard.service';
import { UsersComponent } from './tabs/users/users.component';
import { ActivitiesComponent } from './tabs/activities/activities.component';
import { DepartmentsComponent } from './tabs/departments/departments.component';
import { EditComponent as EditUserComponent } from './users/edit/edit.component';
import { EditComponent as EditActivityComponent } from './activities/edit/edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, AuthGuardAdmin],
    children: [
      {
        path: '',
        component: IndexComponent,
        children: [
          {
            path: 'activities',
            component: ActivitiesComponent,
          },
          {
            path: 'departments',
            component: DepartmentsComponent,
          },
          {
            path: 'users',
            component: UsersComponent,
          },
        ],
      },
      {
        path: 'users/:id',
        component: EditUserComponent,
      },
      {
        path: 'activities/:id',
        component: EditActivityComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
