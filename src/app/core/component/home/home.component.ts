//? Service
import { DataService } from './../../services/data.service';
import { CustomDateFormatter } from './../../services/date-formatter.service';
//? Angular Modules
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, ViewEncapsulation } from '@angular/core';
import {MatDialog,  MatDialogConfig} from '@angular/material/dialog';
//? Calendar modules
import { CalendarEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { parseISO, getWeek, getWeekYear,endOfWeek, addMinutes, format} from 'date-fns';
import {   fromEvent } from 'rxjs';
import {   finalize, takeUntil  } from 'rxjs/operators';
import { WeekViewHourSegment } from 'calendar-utils';
import { CreateEventComponent } from '../modal/create-event/create-event.component';
import { ViewEventComponent } from '../modal/view-event/view-event.component';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  ngOnInit() {}

  // ChangeDateWithMini(date : Date){
  //   this.viewDate = date;
  //   this.view = CalendarView.Week;
  // }
}
