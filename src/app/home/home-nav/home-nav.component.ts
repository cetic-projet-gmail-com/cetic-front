import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { fr } from 'date-fns/locale';
import { format, startOfWeek, endOfWeek } from 'date-fns';

import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.scss']
})
export class HomeNavComponent implements OnInit, OnChanges {
  CalendarView = CalendarView;

  left = faCaretLeft;
  right = faCaretRight;
  showDate;
  constructor() { }
  @Input() view;
  @Input() viewDate;
  @Output() viewDateChange = new EventEmitter<Date>();
  ngOnInit(): void {
  }
  /**
   * Format Date in Nav (ngContent on home.component.html) in French depending on @view (Monthly, Dayly, Weekly...)
   */
  ngOnChanges() {
    let date = this.viewDate;
    let dateFormat = 'dd';
    let month = this.upFirsChar(format(date, 'MMMM', {locale: fr}));
    let year = format(date, 'yyyy');
    let day  =this.upFirsChar(format(date, 'iiii', {locale: fr}));
    if (this.view === CalendarView.Week ) {
      let start = startOfWeek(date, { weekStartsOn: 1 });
      let end = endOfWeek(date, { weekStartsOn: 1 });
      let monthStart = start.getMonth() === end.getMonth() ? '' : this.upFirsChar(format(start, 'MMMM', {locale: fr}));
      let monthEnd = this.upFirsChar(format(end, 'MMMM', {locale: fr}));
      this.showDate = `Du ${format(start, dateFormat)} ${monthStart} au ${format(end, dateFormat)} ${monthEnd} ${year}`;
    } else if (this.view === CalendarView.Month) {
      this.showDate = `${month} ${year}`;
    } else if (this.view === CalendarView.Day) {
      this.showDate = `${day} ${date.getDate()} ${month} ${year}`;
    }
  }
  upFirsChar(d) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  }
  

  getViewDate() {
    this.viewDateChange.emit(new Date(this.viewDate));
  }

}
