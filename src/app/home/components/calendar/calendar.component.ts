import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeekViewHourSegment } from 'calendar-utils';

import { environment } from 'src/environments/environment';

import { Event } from 'src/app/core/models/Event';
import { addDays, addMinutes, endOfWeek, parseISO } from 'date-fns';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string): any {
    if (!event.meta.tmpEvent) {
      return super.weekTooltip(event, title);
    }
  }

  dayTooltip(event: CalendarEvent, title: string): any {
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
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
})
export class CalendarComponent implements OnInit, OnChanges {
  calendarConfig;

  constructor(private cdr: ChangeDetectorRef) {
    this.calendarConfig = environment.calendar;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    if (changes['events']) {
      this.loadEvents();
    }
  }

  @Input()
  viewDate: Date = new Date();

  @Output()
  viewDateChange = new EventEmitter<Date>();

  @Input()
  events: Event[] = [];

  @Input()
  view: CalendarView = CalendarView.Week;

  @Output()
  viewChange = new EventEmitter<CalendarView>();

  @Output()
  handleEditEvent = new EventEmitter();

  CalendarView = CalendarView;
  dragToCreateActive = false;

  calendarEvents: Array<CalendarEvent> = [];

  loadEvents() {
    if (this.events) {
      this.calendarEvents = this.events.map((event) => {
        let calendarEvent: CalendarEvent = {
          title: event.description,
          start: parseISO(event.startAt),
          end: parseISO(event.endAt),
          meta: {
            id: event.id,
          },
        };
        return calendarEvent;
      });
    }
  }

  eventClicked($event: { event: CalendarEvent }) {
    this.handleEditEvent.emit($event.event);
  }

  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New event',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
    };
    this.calendarEvents = [...this.calendarEvents, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;

    const weekStartsOn: any = this.calendarConfig.weekStartsOn;

    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refreshEvents();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: any) => {
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
      });
    this.refreshEvents();
  }

  refreshEvents() {
    this.calendarEvents = [...this.calendarEvents];
    this.cdr.detectChanges();
  }
}
