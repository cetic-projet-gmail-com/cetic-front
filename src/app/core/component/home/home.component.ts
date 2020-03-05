//? Service
import { DataService } from './../../services/data.service';
import { CustomDateFormatter } from './../../services/date-formatter.service';
//? Angular Modules
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
//? Calendar modules
import { CalendarEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { parseISO, getWeek, getWeekYear,endOfWeek,addDays, addMinutes, format} from 'date-fns';
import {  Observable, Subject, fromEvent } from 'rxjs';
import {  map, finalize, takeUntil  } from 'rxjs/operators';
import { WeekViewHourSegment } from 'calendar-utils';
import { CreateEventComponent } from '../modal/create-event/create-event.component';


//? function of "Drag to create events"
function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}
//? function of "Drag to create events"
function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}
//? Injectable of "Drag to create events"
@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent) {
      return super.dayTooltip(event, title);
    }
  }
}
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
  constructor(private DataService: DataService, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }
  //? Refresh events list
  refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
  events : CalendarEvent[]= [];
  ngOnInit() {
    this.getEvents();
    this.getTasks();
  }
  //? Params of Angular-Calendar
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  view: CalendarView = CalendarView.Week;
  viewDate = new Date();
  CalendarView = CalendarView;
  tasks: CalendarEvent[] =  [];
  activeDayIsOpen = false;
  //? List of activities & taks for drag & drop
  activities = [];

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Week;
  }
  //? Select day from mini-calendar
  ChangeDateWithMini(date : Date){
    this.viewDate = date;
    this.view = CalendarView.Week;
  }
  //? Get events for put in calendar
  async getEvents() {
    let date = this.viewDate;
    date = new Date(date);
    let url = "";
    switch (this.view) {
      case CalendarView.Month:
        url = `?display=month&month=${date.getMonth() + 1}&year=${date.getFullYear()}`;
        break;
      case CalendarView.Week:
        url = `?display=week&week=${getWeek(this.viewDate)}&year=${getWeekYear(this.viewDate)}`;
        break;
      case CalendarView.Day:
        url = `?display=day&date=${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      default:
        url = "";
        break;
    }
    this.DataService.getHome(url).subscribe(async result => {
      let json = result.data;
      let colors;
      this.events = await json['events'].map(element => {
        try {
          colors =  json['activities'].find(activity => activity.id === json['tasks'].find(task => element.tasks_id === task.id).activities_id).color_code;
  
        } catch (error) {
          colors = '#8d8d8d';
        }
        return {
          "start": parseISO(element.start),
          "end": parseISO(element.end),
          "title": element.description,
          draggable:true,
          color : {primary: '#263238', secondary: colors},
        }
      });
      this.refresh()
    });
  }
  getTasks() {
    this.DataService.getHome().subscribe(async result =>{
      await result.data['activities'].forEach((activity) => {
        activity['tasks'] =  []
        result.data['tasks'].forEach(task => {
          if (activity.id === task.activities_id)
          activity['tasks'].push( {"taskId": task["id"], "title" : task['name'], /*"start": new Date(),*/ draggable:true });
        });
        if (activity['tasks'].length !== 0){
          this.activities.push( activity)
        }
      });
    });
  }

  externalDrop(event/*: CalendarEvent*/) {
    // event.getPrototypeOf(start)
    this.openEditDialog(event);
  }
  
  //? Drag in calendar for create an event
//? ----------------------------------- -- ----------------------------------- */
  dragToCreateActive = false;
  startDragToCreate(
    segment: WeekViewHourSegment, mouseDownEvent: MouseEvent, segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'Nouveau Billet',
      start: segment.date,
      meta: {tmpEvent: true}
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: 1
    });
    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
          this.openEditDialog(dragToSelectEvent)
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );     
        const newEnd = addMinutes(segment.date, minutesDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }
  //? Open widow for create event
//? ----------------------------------- -- ----------------------------------- */
  openEditDialog(data): void {
    console.log(data.getPrototypeOf("start"))
    let taskId = data.taskId ? data.taskId : null;
    data.end = data.end? data.end : addMinutes(data.start, 60);
    const dialogConfig = new MatDialogConfig();
    const formatHour = 'HH:mm';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { taskId: taskId,
      activities:this.activities, date: data.start, start: format(data.start, formatHour), end: format(data.end, formatHour), title: ""
    }
    let dialogRef = this.dialog.open(CreateEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.events.pop();
        this.refresh();
      } else {
        this.DataService.createEvent(result).subscribe(async (res) => {
          await (res.status); 
          if (res.status === 200) {
            this.getEvents()
          }
      } )      
      }
    });
  }


  async eventDropped({
    event,
    newStart,
    //newEnd,
    // allDay
  }/*: CalendarEventTimesChangedEvent*/): void {
    
    // console.log(typeof newStart)
    event['start'] = new Date(newStart);
    // console.log( typeof event['start'])
    // event['end'] = addMinutes((newStart), 60)
    // console.log(event)
    // console.log(allDay)
    // const externalIndex = this.activities.indexOf(event);
    // console.log(externalIndex)
    // if (typeof allDay !== 'undefined') {
    //   event.allDay = allDay;
    // }
    // if (externalIndex > -1) {
    //   this.activities.splice(externalIndex, 1);
    //   this.events.push(event);
    // }
    
    // console.log(event.start)
    // if (newEnd) {
    //   event.end = newEnd;
    // }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    // this.events = [...this.events];
  }
}
