import { AngularMaterialModule } from './angular-material.module';
import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './core/header/nav/nav.component';
import { LoginComponent } from './core/authentification/login/login.component';
import { HomeComponent } from './core/component/home/home.component';
import { InfoComponent } from './core/component/info/info.component';
import { AdminUsersComponent } from './core/component/admin-users/admin-users.component';
import { ProfilComponent } from './core/component/profil/profil.component';

import { EditActivityComponent } from './core/component/editactivity/editactivity.component';
import { CreateUserComponent } from './core/component/modal/create-user/create-user.component';
import { UpdateUserComponent } from './core/component/modal/update-user/update-user.component';

import { AuthenticationService } from './core/services/auth/authentification.service';
import { AuthGuardService } from './core/services/auth/auth-guard.service';
import { EditUserComponent } from './core/component/edit-user/edit-user.component';
import { CreateActivityComponent } from './core/component/modal/create-activity/create-activity.component';
import { MenuComponent } from './core/header/menu/menu.component';
import { UpdateActivityComponent } from './core/component/modal/update-activity/update-activity.component';
import { CreateDepartementComponent } from './core/component/modal/create-departement/create-departement.component';
import { UpdateDepartementComponent } from './core/component/modal/update-departement/update-departement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,

    NavComponent,
    LoginComponent,
    HomeComponent,
    InfoComponent,
    AdminUsersComponent,
    ProfilComponent,
    ForgotPasswordComponent,
    EditActivityComponent,
    ForgotPasswordComponent,
    CreateUserComponent,
    UpdateUserComponent,
    EditUserComponent,
    CreateActivityComponent,
    MenuComponent,
    UpdateActivityComponent,
    CreateDepartementComponent,
    UpdateDepartementComponent
  ],
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule,
    OrderModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserAnimationsModule
  ],

  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }