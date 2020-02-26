import { DataService } from './../../services/data.service';
import { Component, OnInit} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private DataService: DataService) { }
  
  ngOnInit() {
    this.DataService.getHome().subscribe((res) => {
      console.log(res);

    });
  }

  view: CalendarView = CalendarView.Week;

  viewDate = new Date();

  CalendarView = CalendarView;

  events: CalendarEvent[] = [
  ];

  changeDay(date: Date) {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  setView(choiceView){
    this.view = choiceView
  }

  
}