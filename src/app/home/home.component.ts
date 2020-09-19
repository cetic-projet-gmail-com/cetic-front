import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {  CalendarView, CalendarDateFormatter,  } from 'angular-calendar';
import { CustomDateFormatter } from './../services/date-formatter.service';

@Component({
  selector: 'app-home',
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
  CalendarView = CalendarView;

  events : Array<Object> = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  changeView(v) {
    this.view = v;
    // this.viewChange.emit(v)
  }

}
