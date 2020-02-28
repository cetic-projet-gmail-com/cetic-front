import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EditActivityComponent } from './core/component/editactivity/editactivity.component';



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
    EditActivityComponent

  ],
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }