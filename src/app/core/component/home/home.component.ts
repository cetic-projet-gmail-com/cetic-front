//? Service
import { CustomDateFormatter } from './../../services/date-formatter.service';
//? Angular Modules
import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Output,  OnChanges, SimpleChanges } from '@angular/core';
//? Calendar modules
import {  CalendarView, CalendarDateFormatter } from 'angular-calendar';




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
  CalendarView = CalendarView;

  viewDate = new Date();
  view: CalendarView = CalendarView.Week;
  events : Array<Object> = [];
  constructor() {}
  async ngOnInit() {
  }
  
  

  changeView(v) {
    this.view = v;
    // this.viewChange.emit(v)
  }
}
