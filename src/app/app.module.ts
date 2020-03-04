import { ForgotPasswordComponent } from './core/component/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
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

import { AuthenticationService} from './core/services/auth/authentification.service';
import { AuthGuardService} from './core/services/auth/auth-guard.service';
import { CreateEventComponent } from './core/component/modal/create-event/create-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeFr);
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
    CreateEventComponent
  ],
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    // NgbModalModule,
    MatDialogModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
      
    }),
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [CreateEventComponent]
})
export class AppModule { }