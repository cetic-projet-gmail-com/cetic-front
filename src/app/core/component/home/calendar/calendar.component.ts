//? Service
import { DataService } from '../../../services/data.service';
import { CustomDateFormatter } from '../../../services/date-formatter.service';
//? Angular Modules
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
//? Calendar modules
import { CalendarEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { parseISO, getWeek, getWeekYear, endOfWeek, addMinutes, format } from 'date-fns';
import { fromEvent, Subject, Observable } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { WeekViewHourSegment } from 'calendar-utils';
import { CreateEventComponent } from '../../modal/create-event/create-event.component';
import { ViewEventComponent } from '../../modal/view-event/view-event.component';
import { MoveEventComponent } from '../../modal/move-event/move-event.component';

import { HomeService } from 'src/app/core/services/home.service';
import { EditEventComponent } from '../../modal/edit-event/edit-event.component';

 
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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  constructor(private DataService: DataService, private cdr: ChangeDetectorRef, private dialog: MatDialog, private HomeService: HomeService) { }
  //? Params of Angular-Calendar
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  startHour = 8;
  endHour = 20;
  @Input() view: CalendarView;
  @Input() viewDate: Date;
  @Output() viewDateChange = new EventEmitter<Date>();
  @Output() viewChange = new EventEmitter<string>();
  events: CalendarEvent[] = [];
  //? List of Activities - util for creating new Event
  activities = [];
  //?Tooltip html elements
  container;
  div;
 
  ngOnInit() {
    //? Set tooltip div (view hour for drag to create)
    this.container = document.getElementById('containerTooltip');
    this.div = document.createElement('div');
    this.container.appendChild(this.div);
    this.div.classList.add("dragHour");
    //?
    
  }
  ngOnChanges() {
    this.getDatas();
  }
  //? Change day when a day is clicked on view month
  changeDay(date: Date) {
    this.viewDate = date;
    this.viewChange.emit(CalendarView.Week);
    this.viewDateChange.emit(this.viewDate);
  }
   //? Refresh view for display events list
  refreshing() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
//* ------------------------- Get Items From REST API ------------------------ */

  getDatas() {
    this.events = [];
    let date = this.viewDate;
    let url = "";
    switch (this.view) {
      case CalendarView.Month:
        url = `?display=month&month=${date.getMonth() + 1}&year=${date.getFullYear()}`;
        break;
      case CalendarView.Week:
        url = `?display=week&week=${getWeek(this.viewDate, { weekStartsOn: 1 })}&year=${getWeekYear(this.viewDate)}`;
        break;
      case CalendarView.Day:
        url = `?display=day&date=${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      default:
        url = ""; //? Req for actual week
        break;
    }
    this.DataService.getHome(url).subscribe((result) => {
         
      this.activities.length === 0 ? this.getTasks(result) : "";
      this.getEvents(result);
      
    });
  }

  getEvents(result) {
    let json = result['data'];
    
    json['events'].forEach(element => {
      this.setEvent(element)
    });
  }
  setEvent(event) {
    let task, activity;
    activity = this.activities.find(act =>  
        act['tasks'].some(t => 
          t.taskId === event.taskId
      )
    );
    task = activity['tasks'].find(tsk => 
      tsk.taskId === event.taskId
    );
    this.events.push({
      start: parseISO(event.start),
      end: parseISO(event.end),
      title: event.description,
      draggable: true,
      allDay: false,
      // resizable: {
      //   beforeStart: true, // this allows you to configure the sides the event is resizable from
      //   afterEnd: true
      // },
      color: { primary: '#263238', secondary: activity.color_code },
      meta: {
        id: event.id,
        taskId: event.taskId,
        taskName: task.title,
        activityId: activity.id,
        activityName: activity.name
      }
    });
    this.refreshing();
  }
  getTasks(result) {
    result['data'].activities.forEach((activity) => {
      activity['tasks'] = []
      result['data'].tasks.forEach(task => {
        if (activity.id === task.activities_id)
          activity['tasks'].push({ "taskId": task["id"], "title": task['name'], "start": new Date(), draggable: true });
      });
      if (activity['tasks'].length !== 0) {
        this.activities.push(activity)
      }
    });
  }
  //* ------------------------------ Create Event ------------------------------ */
  dragToCreateActive = false;
  ceilToNearest(amount: number, precision: number) {
    return Math.ceil(amount / precision) * precision;
  }
  startDragToCreate(
    segment: WeekViewHourSegment, mouseDownEvent: MouseEvent, segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      title: 'Nouveau Billet',
      start: segment.date,
    };
    this.dragToCreateActive = true;

    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    //? tooltip (div Hour Start - Hour End)
    //* tooltip
    this.div.style.display = "block";
    //*
    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          this.dragToCreateActive = false;

          this.createEvent(dragToSelectEvent);
          //*Tooltip
          this.container.removeEventListener('mousemove', this.toolTipCreate, false);
          this.div.style.display = "none";
          //*
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = this.ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );
        const newEnd = addMinutes(segment.date, minutesDiff);
        if (newEnd > segment.date) {
          dragToSelectEvent.end = newEnd;
        }
        //* Tooltip
        let tooltipInfos = {
          div: this.div,
          start: dragToSelectEvent.start,
          end: newEnd,
          container: this.container
        }
        this.container['infos'] = tooltipInfos;
        this.container.addEventListener('mousemove', this.toolTipCreate, false);
        //*
        this.refreshing();
      });
  }
  //* Dialog Create
  createEvent(data): void {
    const formatHour = 'HH:mm';

    let taskId = data.taskId ? data.taskId : null;
    let end = data.end ? format(data.end, formatHour) : '';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit-event';
    dialogConfig.data = {
      taskId: taskId,
      activities: this.activities, date: data.start, start: format(data.start, formatHour), end 
    }
    let dialogRef = this.dialog.open(CreateEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        this.events.pop();
        this.refreshing();
      } else {
        this.DataService.createEvent(result).subscribe(async (resServer) => {
          await (resServer.status);
          if (resServer.status === 200) {
            let resEvent = resServer.body['event'];
            // let colors = result.color;
            this.events.pop();
            this.setEvent(resEvent);
          } else {
            //TODO Dialog Error 500 
          }
        })
      }
    });
  }
  toolTipCreate(e): void {
    let { start, end, div, container } = e.currentTarget.infos;
    var x = e.clientX,       y = e.clientY;
    div.style.top = (y - container.offsetHeight) + 'px';
    div.style.left = (x) + 'px';
    div.innerText = `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  }

  //* ------------------------------- view Event ------------------------------- */
  //? Event comport one button for remove & one for edit
  eventClicked(event) {
    let id = event['event'].meta.id;
    let Ievent = this.events.findIndex(e => e['meta'].id === id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit-event';
    dialogConfig.data = event;
    let dialogRef = this.dialog.open(ViewEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
//* ------------------------------ Remove Event ------------------------------ */
      if (result === "removed") {
        this.DataService.deleteEvent(id).subscribe(async (resServer) => {
          await (resServer.status);
          if (resServer.status === 200) {
            this.events.splice(Ievent,1);
            
            this.refreshing();
          } else {
            //TODO Dialog Error 500
          }
        })

//* ------------------------------- Patch Event ------------------------------ */

      } else if(result === "edit") {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.panelClass = 'edit-event';
        dialogConfig.data = event;
        let dialogRef = this.dialog.open(EditEventComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          this.DataService.updateEvent(id, result ).subscribe(async (resServer) => {
            await (resServer.status);
            if (resServer.status === 200) {
              this.events.splice(Ievent,1);
              this.setEvent(resServer.body['event']);
            } else {
              //TODO Dialog Error 500

            }
          })
        });
      }
    });
  }

  //* --------------------------- Event Time Changed --------------------------- */
  //? Comport too draggable "Tasks" from aside left
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    if (event.meta) {
      // if (this.view !== CalendarView.Month) {
        let Ievent = this.events.findIndex(e => e['meta'].id === event['meta'].id);
        let oldStart, oldEnd;
        ({oldStart, oldEnd} = {oldStart :event["start"],oldEnd: event["end"]})
        let EventFound = this.events[Ievent];
        EventFound.start = newStart;
        EventFound.end = newEnd;
        this.refreshing();

        const dialogConfig = new MatDialogConfig();
        dialogConfig.panelClass = 'edit-event';
        let dialogRef = this.dialog.open(MoveEventComponent, dialogConfig);
        //? Action of Dialog (btn confirm - btn cancel)
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            let patch = {
              "start": newStart,
              "end": newEnd
            }
            this.DataService.updateEvent(event['meta'].id, patch).subscribe(async (resServer) => {
              await (resServer.status);
              if (resServer.status === 200) {
                EventFound.start = newStart;
                EventFound.end = newEnd;
                this.refreshing();
              } else {
                //TODO Dialog Error 500
              }
            });
          } else {
            //? Back to initiales values
            EventFound.start = oldStart;
            EventFound.end = oldEnd;
            this.refreshing();
          }
        });
      // }
//* ---------------------- Drop Task for creating Event ---------------------- */
    } else {
      event['start'] = newStart;
      // event['end'] = addMinutes((event['start']), 60);
      this.events.push(event);
      this.refreshing();
      this.createEvent(event);
    }
  }
}
