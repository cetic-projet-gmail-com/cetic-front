import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import Activity from 'src/app/core/models/Activity';

@Component({
  selector: 'app-home-aside',
  templateUrl: './home-aside.component.html',
  styleUrls: ['./home-aside.component.scss'],
})
export class HomeAsideComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  activities: Activity[] = [];

  @Input()
  viewDate: Date;

  // @Output()
  // viewDateChange = new EventEmitter<Date>();
}
