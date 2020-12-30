import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injectable, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { parseISO, getWeek, getWeekYear, endOfWeek, addMinutes, format, addHours } from 'date-fns';
import { CalendarEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { fromEvent, Subject, Observable } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { WeekViewHourSegment } from 'calendar-utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CalendarComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
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
    //? Change day when a day is clicked on view month
    refreshing() {
      this.events = [...this.events];
      this.cdr.detectChanges();
    }
  changeDay(date: Date) {
    this.viewDate = date;
    this.viewChange.emit(CalendarView.Week);
    this.viewDateChange.emit(this.viewDate);
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
    // this.div.style.display = "block";
    //*
    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          this.dragToCreateActive = false;

          this.createEvent(dragToSelectEvent);
          //*Tooltip
          // this.container.removeEventListener('mousemove', this.toolTipCreate, false);
          // this.div.style.display = "none";
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
          // div: this.div,
          start: dragToSelectEvent.start,
          end: newEnd,
          // container: this.container
        }
        // this.container['infos'] = tooltipInfos;
        // this.container.addEventListener('mousemove', this.toolTipCreate, false);
        //*
        this.refreshing();
      });
  }

  createEvent() {
    let event = {
      startAt: new Date(),
      endAt: addHours(new Date(), 1),
      description: 'un super event'
    } 
    this.events.push({
      start: event.startAt,
      end: event.endAt,
      title: ` ${event.description}`,
      draggable: true,
      allDay: false,
      resizable: {
        beforeStart: true, // this allows you to configure the sides the event is resizable from
        afterEnd: true,
        
      },
      color: { primary: '#263238', secondary: '#f5f6f8'/*activity.colour.code*/ },
      meta: {
        // id: event.id,
        // taskId: event.taskId,
        // taskName: task.name,
        // activityId: activity.id,
        // activityName: activity.name
      }
    });
  }

}
