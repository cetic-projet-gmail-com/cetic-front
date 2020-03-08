import { Component, OnInit,ViewChild, Output, EventEmitter, Input} from '@angular/core';
import { jqxCalendarComponent } from 'jqwidgets-ng/jqxcalendar';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss']
})
export class MiniCalendarComponent implements OnInit {
  constructor() { }


  ngOnInit() {
    // this.DataService.getActivities().subscribe((res) => {
    //   // this.activitie = res.data.activities
    //   // console.log(this.activitie);
    //   // console.log(res)
    // this.blabla.test();
    // });
  }
  
  miniCalendarDate = new Date();
  @Input() viewDate;
  @Output() viewDateChange = new EventEmitter<any>();
  ngAfterViewInit(){
    this.myCalendar.culture('fr-FR')
  }
  @ViewChild('myCalendar', { static: false }) myCalendar: jqxCalendarComponent;

  miniDate = new Date();

  getDate(event:any):void {
    
    this.viewDateChange.emit( event.args.date);
  }
    
  
}