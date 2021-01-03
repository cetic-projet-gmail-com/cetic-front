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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import { MaterialModule } from '../material.module';
import { EditEventComponent } from './components/Dialogs/edit-event/edit-event.component';

import { DateNav } from '../core/pipes/date.pipe';
@NgModule({
  declarations: [
    DateNav,
    IndexComponent,
    ProfileComponent,
    CalendarComponent,
    HomeAsideComponent,
    EditEventComponent,
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
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [],
})
export class HomeModule {}
