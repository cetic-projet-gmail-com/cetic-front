import { DataService } from '../../../services/data.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-home-aside',
  templateUrl: './home-aside.component.html',
  styleUrls: ['./home-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAsideComponent implements OnInit {
  constructor(private DataService: DataService, private cdr: ChangeDetectorRef) { }
  activities = [];

  ngOnInit() {
    this.getTasks()
  }
  
   getTasks() {
    this.DataService.getHome().subscribe(async result =>{
      await result["data"].activities.forEach(activity => {
        activity.tasks = activity.tasks.map(task => {return {"taskId": task["id"], "title" : task['name'], "start": new Date(), draggable:true }});

      });
      this.activities = result["data"].activities;
      this.cdr.detectChanges();
    });
  }


  miniCalendarDate = new Date();

}
