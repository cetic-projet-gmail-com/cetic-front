import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  viewDate: Date = new Date();

  @Output()
  viewDateChange = new EventEmitter<Date>();
}
