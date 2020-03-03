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
import {
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
import { element } from 'protractor';
interface Film {
  id: number;
  title: string;
  release_date: string;
}


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

  }
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  CalendarView = CalendarView;

  externalEvents: CalendarEvent[] =  [{
    title: 'Event 1',
    start: new Date(),
    draggable: true
  },
  {
    title: 'Event 2',
    start: new Date(),
    draggable: true
  }];
  activeDayIsOpen = false;


  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }
  getEvents(): void {
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
    /*
        this.DataService.getHome(url).subscribe( (res) => {
          // console.log(res.data['events'])
          res.data['events'].map(element => {
            console.log(element);
            
            this.events$.push( {
              "start": parseISO(element.start), "end": parseISO(element.end), "title": element.description/*, actions: [{label: '<p>edit e</p>', onClick: ({ e }: { e: CalendarEvent }): void => {this.openDialog(e);}}]
            });
          });
          console.log('c bon')
        });*/

    this.events$ = this.DataService.getHome(url).pipe(map(result => {
      // this.externalEvents = result.data['tasks'].map(element => { console.log(element.name); return { "title" : element['name'], "start": new Date(), draggable:true }});
      console.log(this.externalEvents)
      return result.data['events'].map(element => {
        return {
          "start": parseISO(element.start),
          "end": parseISO(element.end),
          "title": element.description,
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

  externalDrop(event: CalendarEvent) {
    if (this.externalEvents.indexOf(event) === -1) {
      this.events$ = this.events$.filter(iEvent => iEvent !== event);
      this.externalEvents.push(event);
    }
  }
  eventDropped({
    event,
    newStart,
    newEnd,
    allDay
  }: CalendarEventTimesChangedEvent): void {
    const externalIndex = this.externalEvents.indexOf(event);
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
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
