//? Service
import { DataService } from './../../services/data.service';
import { CustomDateFormatter } from './../../services/date-formatter.service';
//? Angular Modules
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, ViewEncapsulation, Output,  OnChanges, SimpleChanges } from '@angular/core';
import {MatDialog,  MatDialogConfig} from '@angular/material/dialog';
//? Calendar modules
import { CalendarEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { parseISO, getWeek, getWeekYear,endOfWeek, addMinutes, format} from 'date-fns';
import {   fromEvent } from 'rxjs';
import {   finalize, takeUntil, map  } from 'rxjs/operators';
import { WeekViewHourSegment } from 'calendar-utils';
import { CreateEventComponent } from '../modal/create-event/create-event.component';
import { ViewEventComponent } from '../modal/view-event/view-event.component';
import { HomeService } from '../../services/home.service';




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
  viewDate = new Date();
  view: CalendarView = CalendarView.Week;
  events : Array<Object> = [];
  constructor(private DataService: DataService, private HomeService: HomeService) {}
  async ngOnInit() {
    this.funcEvents()
  }
  async funcEvents(): Promise<void> {
    
    this.events  =await  this.HomeService.getEvents(this.view, this.viewDate);
    // console.log(this.events)
  }

  //  funcEvents = async () => {
    // await this.HomeService.getEvents(this.view, this.viewDate).then((res) => {
    //   console.log('----------------')
    //   console.log(res)
    //   console.log(["testjqklfsdj", "jfdkqhfdkjh", "jkhfdskqlsmdfhk"])
    //   console.log(typeof res)
    //   this.events = res
    //   // this.events.push(res.map(el => el));
    // });

    // console.log(typeof this.events)
  // }
}
