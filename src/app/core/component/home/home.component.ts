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
//? Injextable of "Drag to create events"
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
  // events$: Observable<Array<CalendarEvent<{ film: Film }>>>;
  events$ : CalendarEvent[]= [];
  ngOnInit() {
    this.getEvents();
    this.getTasks();
  }
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  // refresh = new Subject<void>();

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  CalendarView = CalendarView;

  tasks: CalendarEvent[] =  [];
  activities = [];
  activeDayIsOpen = false;


  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
  getEvents(): void {
    // this.events$ = []
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

    /*this.events$ = */this.DataService.getHome(url)./*pipe(map*/subscribe(result => {
      let json = result.data;
      let colors;
       /*return */ this.events$ = json['events'].map(element => {
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
          /*actions: [{
            label: '<p>edit e</p>',
            onClick: ({
              e
            }: {
              e: CalendarEvent
            }): void => { }
          }]*/
        }
      })
      this.refresh();

    })/*)*/
    
  }
  getTasks() {
    this.DataService.getHome().subscribe(result =>{
      result.data['activities'].forEach((activity) => {
        activity['tasks'] =  []
        result.data['tasks'].forEach(task => {
          if (activity.id === task.activities_id)
          activity['tasks'].push( {"id": task["id"], "title" : task['name'], "start": new Date(), draggable:true });
        });
        if (activity['tasks'].length !== 0){
          this.activities.push( activity)
        }
      });
    });
  }

  externalDrop(event: CalendarEvent) {
    console.log('hhhhh')
    console.log(event)
    /*if (this.tasks.indexOf(event) === -1) {
      this.events$ = this.events$.filter(iEvent => iEvent !== event);
      this.activities.push(event);
    }*/
  }
  
  
  dragToCreateActive = false;
  refresh() {
    this.events$ = [...this.events$];
    this.cdr.detectChanges();
  }
  startDragToCreate(
    
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events$.length,
      title: 'New event',
      start: segment.date,
      meta: {
        tmpEvent: true
      }
    };
    this.events$ = [...this.events$, dragToSelectEvent];
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

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  openEditDialog(data): void {
    /*
        const dialogRef = this.dialog.open(CreateEventComponent, {
          width: '250px',
          data: {}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
   */
        // console.log(data)
    data.end = data.end? data.end : addMinutes(data.start, 60);
    // console.log(data.start)
    const dialogConfig = new MatDialogConfig();
    const formatHour = 'HH:mm';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {activities:this.activities, date: data.start, start: format(data.start, formatHour), end: format(data.end, formatHour), title: ""}
    let dialogRef = this.dialog.open(CreateEventComponent, dialogConfig);
    console.log(dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === undefined) {
        this.events$.pop();
        this.refresh();
      }
      
    });
  }

 
}
