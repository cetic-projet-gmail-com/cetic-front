import { Component, OnInit,  Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { HomeService } from '../../../services/home.service'
import { CalendarEvent, CalendarView, CalendarDateFormatter, DAYS_OF_WEEK, CalendarEventTimesChangedEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss'],
})
export class HomeNavComponent implements OnInit {
  CalendarView = CalendarView;
  
  @Input() view;
  @Input() viewDate ;
  @Output() viewDateChange =new EventEmitter<Date>();
  // @Output() viewChange = new EventEmitter<string>();
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  constructor() { }
  ngOnInit() {
  
  }

  

  // changeView(v) {
  //   this.view = v;
  //   this.viewChange.emit(v)
  // }

  getViewDate() {
    this.viewDateChange.emit(new Date( this.viewDate));
  } 
}
