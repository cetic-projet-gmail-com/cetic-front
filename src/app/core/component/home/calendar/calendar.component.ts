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

  container;
  div;
  //? Refresh events list
  refreshing() {
    this.events = [...this.events];

    this.cdr.detectChanges();
  }
  events: CalendarEvent[] = [];

  async ngOnChanges() {
    //  console.log(this.dragAndDrop)
    this.getEvents();
  }
  ngOnInit() {
    this.container = document.getElementById('containerTooltip');
    this.div = document.createElement('div');
    this.container.appendChild(this.div);
    this.div.classList.add("dragHour");

    this.getTasks();
  }
  refresh: Subject<any> = new Subject();
  refreshView() {
    this.refresh.next()
  }

  //? Params of Angular-Calendar
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  @Input() view: CalendarView;
  @Input() viewDate: Date;
  @Output() viewChange = new EventEmitter<string>();

  tasks: CalendarEvent[] = [];
  //? List of activities & taks for drag & drop
  activities = [];

  // move = true;
  changeDay(date: Date) {
    this.viewDate = date;
    this.viewChange.emit(CalendarView.Week)
  }

  getTasks() {
    this.DataService.getHome().subscribe(async result => {
      await result['data'].activities.forEach((activity) => {
        activity['tasks'] = []
        result['data'].tasks.forEach(task => {
          if (activity.id === task.activities_id)
            activity['tasks'].push({ "taskId": task["id"], "title": task['name'], "start": new Date(), draggable: true });
        });
        if (activity['tasks'].length !== 0) {
          this.activities.push(activity)
        }
      });
    });
  }


  //? Drag in calendar for create an event
  //? ----------------------------------- -- ----------------------------------- */

  //   //? Open widow for create event && for view dialog
  // //? ----------------------------------- -- ----------------------------------- */






  getEvents() {
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
        url = "";
        break;
    }
    this.DataService.getHome(url).subscribe((result) => {
      let json = result['data'];
      let colors;
      json['events'].forEach(element => {
        try {
          colors = json['activities'].find(activity => activity.id === json['tasks'].find(task => element.tasks_id === task.id).activities_id).color_code;
        } catch (error) {
          colors = '#8d8d8d';
        }
        this.events.push({
          "start": parseISO(element.start),
          "end": parseISO(element.end),
          "title": element.description,
          draggable: true,
          allDay: false,
          // resizable: {
          //   beforeStart: true, // this allows you to configure the sides the event is resizable from
          //   afterEnd: true
          // },
          color: { primary: '#263238', secondary: colors },
          meta: {
            test: "test",
            id: element.id,
            taskId: element.tasks_id
          }
        });
      });
      this.refreshing();
    });
  }


  /* ------------------------------ Create Event ------------------------------ */

  startDragToCreate(
    segment: WeekViewHourSegment, mouseDownEvent: MouseEvent, segmentElement: HTMLElement
  ) {

    const dragToSelectEvent: CalendarEvent = {
      // id: this.events.length,
      title: 'Nouveau Billet',
      start: segment.date,
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    //? tooltip (div Hour Start - Hour End)
    //* tooltip
    this.div.style.display = "block";
    //*
    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          this.createEvent(dragToSelectEvent);
          //*Tooltip
          this.container.removeEventListener('mousemove', this.toolTipCreate, false);
          this.div.style.display = "none";
          //*
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
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
    let taskId = data.taskId ? data.taskId : null;
    data.end = data.end ? data.end : addMinutes(data.start, 60);
    const dialogConfig = new MatDialogConfig();
    const formatHour = 'HH:mm';
    dialogConfig.panelClass = 'edit-event';
    dialogConfig.data = {
      taskId: taskId,
      activities: this.activities, date: data.start, start: format(data.start, formatHour), end: format(data.end, formatHour), title: ""
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

  /* ------------------------------- view Event ------------------------------- */
  eventClicked(event) {
    let id = event['event'].meta.id;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit-event';
    dialogConfig.data = event;
    let dialogRef = this.dialog.open(ViewEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === "removed") {
        this.DataService.deleteEvent(id).subscribe(async (resServer) => {
          await (resServer.status);
          if (resServer.status === 200) {
            this.events.splice(this.events.findIndex(e => e['meta'].id === id),1);
            this.refreshing();
          } else {
            
          }
        })
      }
    });
  }

  /* --------------------------- Event Time Changed --------------------------- */
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    if (event.meta) {
      if (this.view !== CalendarView.Month) {
        const hourFormat = "HH:mm";
        const dialogConfig = new MatDialogConfig();
        dialogConfig.panelClass = 'edit-event';

        let dialogRef = this.dialog.open(MoveEventComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
            let patch = {
              "start": newStart,
              "end": newEnd
            }
            this.DataService.updateEvent(event['meta'].id, patch).subscribe(async (resServer) => {
              await (resServer.status);
              if (resServer.status === 200) {
                let Ievent = this.events.findIndex(e => e['meta'].id === event['meta'].id);
                let EventFound = this.events[Ievent];
                EventFound.start = newStart;
                EventFound.end = newEnd;
                this.refreshing();
              } else {
                //TODO Dialog Error 500
              }
            });
          }
        });
      }
    } else {
      event['start'] = newStart;
      event['end'] = addMinutes((event['start']), 60);
      this.events.push(event);
      this.refreshing();
      this.createEvent(event);
    }
  }
}
