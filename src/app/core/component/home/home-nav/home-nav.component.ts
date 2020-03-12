import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { fr } from 'date-fns/locale';
import { format, startOfWeek, endOfWeek } from 'date-fns';

import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss'],
})
export class HomeNavComponent implements OnInit, OnChanges {
  CalendarView = CalendarView;

  left = faCaretLeft
  right = faCaretRight
  showDate


  @Input() view;
  @Input() viewDate;
  @Output() viewDateChange = new EventEmitter<Date>();
  // @Output() viewChange = new EventEmitter<string>();
  
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  constructor() { }
//   startDate = formatISO9075(startOfWeek(setISOWeek(new Date(year, 0, 0), week), { weekStartsOn: 1 }))
// endDate = formatISO9075(endOfWeek(new Date(startDate), { weekStartsOn: 1 }))

  ngOnInit() {
 
    
  }
  upFirsChar(d) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  }
  ngOnChanges() {
    let date = this.viewDate;
    let dateFormat = 'dd';
    let month = this.upFirsChar(format(date, 'MMMM', {locale: fr}));
    let year = format(date, 'yyyy');
    let day  =this.upFirsChar(format(date, 'iiii', {locale: fr}));
    if (this.view === CalendarView.Week ) {
      let start = startOfWeek(date, { weekStartsOn: 1 });
      let end = endOfWeek(date, { weekStartsOn: 1 });
      let monthDif = start.getMonth() === end.getMonth() ? '' : this.upFirsChar(format(start, 'MMMM', {locale: fr}));
      this.showDate = `Du ${format(start, dateFormat)} ${monthDif} au ${format(end, dateFormat)} ${month} ${year}`;
    } else if (this.view === CalendarView.Month) {
      this.showDate = `${month} ${year}`;
    } else if (this.view === CalendarView.Day) {
      this.showDate = `${day} ${date.getDate()} ${month} ${year}`;
    }
  }
 
  

  // changeView(v) {
  //   this.view = v;
  //   this.viewChange.emit(v)
  // }

  getViewDate() {
    this.viewDateChange.emit(new Date(this.viewDate));
  }
}
