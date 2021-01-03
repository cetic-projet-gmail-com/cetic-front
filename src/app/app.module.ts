import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';

import { FieldError } from 'src/app/core/pipes/form.pipe';

@NgModule({
  declarations: [AppComponent, LoginComponent, FieldError],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    AdminModule,
    HomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
