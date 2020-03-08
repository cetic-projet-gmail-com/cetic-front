//? Service
import { DataService } from './../../services/data.service';
import { CustomDateFormatter } from './../../services/date-formatter.service';
//? Angular Modules
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, ViewEncapsulation, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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

export class HomeComponent implements OnInit, OnChanges {
  viewDate = new Date();
  view: CalendarView = CalendarView.Week;
  constructor(private DataService: DataService) {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
  events;
  getEvents(){}
  // async getEvents() {
  //   let date = this.viewDate;
  //   date = new Date(date);
  //   let url = "";
  //   switch (this.view) {
  //     case CalendarView.Month:
  //       url = `?display=month&month=${date.getMonth() + 1}&year=${date.getFullYear()}`;
  //       break;
  //     case CalendarView.Week:
  //       url = `?display=week&week=${getWeek(this.viewDate)}&year=${getWeekYear(this.viewDate)}`;
  //       break;
  //     case CalendarView.Day:
  //       url = `?display=day&date=${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  //       break;
  //     default:
  //       url = "";
  //       break;
  //   }
  //   this.DataService.getHome(url).subscribe(async result => {
  //     let json = result.data;
  //     let colors;
  //     this.events = await json['events'].map(element => {
  //       try {
  //         colors =  json['activities'].find(activity => activity.id === json['tasks'].find(task => element.tasks_id === task.id).activities_id).color_code;
  
  //       } catch (error) {
  //         colors = '#8d8d8d';
  //       }
  //       return {
  //         "start": parseISO(element.start),
  //         "end": parseISO(element.end),
  //         "title": element.description,
  //         draggable:true,
  //         color : {primary: '#263238', secondary: colors},
  //         meta : {
  //           test: "test",
  //           id: element.id,
  //           taskId: element.tasks_id
  //         }
  //       }
  //     });
  //   });
  // }
}
