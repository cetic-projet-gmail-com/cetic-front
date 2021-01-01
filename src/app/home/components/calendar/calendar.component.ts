import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() viewDate: Date;

  @Output()
  viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;

  constructor() {}

  ngOnInit(): void {}
}
