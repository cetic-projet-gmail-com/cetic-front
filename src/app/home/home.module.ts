import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HomeAsideComponent } from './components/home-aside/home-aside.component';
import { FlatPickerComponent } from './components/flat-picker/flat-picker.component';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import 'flatpickr/dist/flatpickr.css';
@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    CalendarComponent,
    HomeAsideComponent,
    FlatPickerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    FormsModule,
  ],
  exports: [],
})
export class HomeModule {}
