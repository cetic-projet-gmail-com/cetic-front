import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss']
})
export class MiniCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() viewDate;
  @Input() view;
  @Output() viewChange = new EventEmitter<any>();
  @Output() viewDateChange = new EventEmitter<any>();
  miniDate = new Date();

}
