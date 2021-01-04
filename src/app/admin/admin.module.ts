import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { IndexComponent } from './index/index.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './tabs/users/users.component';
import { ActivitiesComponent } from './tabs/activities/activities.component';
import { DepartmentsComponent } from './tabs/departments/departments.component';
import { EditComponent as EditUserComponent } from './users/edit/edit.component';

@NgModule({
  declarations: [
    IndexComponent,
    UsersComponent,
    ActivitiesComponent,
    DepartmentsComponent,
    EditUserComponent,
  ],
  imports: [AdminRoutingModule, CommonModule, SharedModule],
})
export class AdminModule {}
