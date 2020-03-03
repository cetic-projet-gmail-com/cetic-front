import {
  DataService
} from './../../services/data.service';
import {
  CustomDateFormatter
} from './../../services/date-formatter.service';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  parseISO,
  getWeek,
  getWeekYear
} from 'date-fns';
import {  Observable, Subject } from 'rxjs';
import {  map } from 'rxjs/operators';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }]
})

export class HomeComponent implements OnInit {

  constructor(private DataService: DataService) { }
  // events$: Observable<Array<CalendarEvent<{ film: Film }>>>;
  events$;
  ngOnInit() {
    this.getEvents();
    this.getTasks();
  }
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  refresh = new Subject<void>();

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
    // this.events$ = [];

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

    this.events$ = this.DataService.getHome(url).pipe(map(result => {     
      return result.data['events'].map(element => {
        return {
          "start": parseISO(element.start),
          "end": parseISO(element.end),
          "title": element.description,
          draggable:true,
          actions: [{
            label: '<p>edit e</p>',
            onClick: ({
              e
            }: {
              e: CalendarEvent
            }): void => { }
          }]
        }
      })
    }))
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
    if (this.tasks.indexOf(event) === -1) {
      this.events$ = this.events$.filter(iEvent => iEvent !== event);
      this.activities.push(event);
    }
  }
  eventDropped({
    event,
    newStart,
    newEnd,
    allDay
  }: CalendarEventTimesChangedEvent): void {
    console.log('hey')
    const externalIndex = this.activities.indexOf(event);
    console.log(event)
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.activities.splice(externalIndex, 1);
      this.events$.push(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    this.events$ = [...this.events$];
  }
}
