import { Component, OnInit,ViewChild, Output, EventEmitter} from '@angular/core';
import { jqxCalendarComponent } from 'jqwidgets-ng/jqxcalendar';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss']
})
export class MiniCalendarComponent implements OnInit {
  constructor() { }

  // activitie

  ngOnInit() {
    // this.DataService.getActivities().subscribe((res) => {
    //   // this.activitie = res.data.activities
    //   // console.log(this.activitie);
    //   // console.log(res)
    // this.blabla.test();
    // });
  }
  
  miniCalendarDate = new Date();

  @Output() outputMini = new EventEmitter<any>();
  ngAfterViewInit(){
    this.myCalendar.culture('fr-FR')
  }
  @ViewChild('myCalendar', { static: false }) myCalendar: jqxCalendarComponent;

  miniDate = new Date();

  // getDate(event:any):void {
    
    
  //   this.outputMini.emit( event.args.date)
  // }
    
  
}