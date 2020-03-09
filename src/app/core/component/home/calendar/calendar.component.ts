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
  //? Refresh events list
  async refreshing() {
    this.events = [...this.events];

    this.cdr.detectChanges();
  }
  events: CalendarEvent[];

  async ngOnChanges() {
    this.getEvents()
    
  }
  async getEvents() {
    this.events = await this.HomeService.getEvents(this.view, this.viewDate);
    this.refreshView()
  }
  async ngOnInit() {
    this.getEvents()

    // this.view = this.view 
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
  // CalendarView = CalendarView;
  tasks: CalendarEvent[] = [];
  //? List of activities & taks for drag & drop
  activities = [];

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
  dragToCreateActive = false;
  startDragToCreate(
    segment: WeekViewHourSegment, mouseDownEvent: MouseEvent, segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'Nouveau Billet',
      start: segment.date,
      meta: { tmpEvent: true }
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
          this.refreshing();
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
        this.refreshing();
      });
  }
  //   //? Open widow for create event && for view dialog
  // //? ----------------------------------- -- ----------------------------------- */
  openEditDialog(data): void {
    let taskId = data.taskId ? data.taskId : null;
    data.end = data.end ? data.end : addMinutes(data.start, 60);
    const dialogConfig = new MatDialogConfig();
    const formatHour = 'HH:mm';
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
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
        this.DataService.createEvent(result).subscribe(async (res) => {
          await (res.status);
          if (res.status === 200) {
            // this.getEvents()
          }
        })
      }
    });
  }
  openViewDialog(event): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = event;
    this.dialog.open(ViewEventComponent, dialogConfig);
  }


  eventDropped({
    event,
    newStart,
  }: CalendarEventTimesChangedEvent): void {
    if (this.view === 'month') {
      event['start'] = new Date(newStart);
    } else {
      event['start'] = new Date(newStart);
    }
    event['end'] = addMinutes((event['start']), 60);

    this.events.push(event)
    this.openEditDialog(event);
  }

  eventClicked(event) {
    this.openViewDialog(event)
  }



}
