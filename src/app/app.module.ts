/* --------------------------------- Modules -------------------------------- */

import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
/* ---------------------------- Simple Components --------------------------- */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './login/info/info.component';
import { ErrorComponent } from './error/error.component';
/* ---------------------------- Users Components ---------------------------- */
import { ListUserComponent } from './users/list-user/list-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
/* -------------------------- Activities Components ------------------------- */
import { EditActivitiesComponent } from './activities/edit-activities/edit-activities.component';
import { ListActivitiesComponent } from './activities/list-activities/list-activities.component';
/* ----------------------------- Home Components ---------------------------- */
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { HomeAsideComponent } from './home/home-aside/home-aside.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
/* -------------------------------- Services -------------------------------- */
import { InMemoryDataServiceService } from './fake-api/in-memory-data-service.service';
import { ForgotPassComponent } from './login/forgot-pass/forgot-pass.component';
import { NavComponent } from './header/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InfoComponent,
    ErrorComponent,
    ListUserComponent,
    EditUserComponent,
    EditActivitiesComponent,
    ListActivitiesComponent,
    CalendarComponent,
    HomeAsideComponent,
    HomeNavComponent,
    ForgotPassComponent,
    NavComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataServiceService, { dataEncapsulation: false}
    ),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
