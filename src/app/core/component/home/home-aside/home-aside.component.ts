import { DataService } from '../../../services/data.service';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home-aside',
  templateUrl: './home-aside.component.html',
  styleUrls: ['./home-aside.component.scss']
})
export class HomeAsideComponent implements OnInit {

  constructor(private DataService: DataService) { }
  

  ngOnInit() {
    this.getTasks();
    console.log(this.activities)
  }
  activities = [];
  async getTasks() {
    this.DataService.getHome().subscribe(async result =>{
      await result.data['activities'].forEach((activity) => {
        activity['tasks'] =  []
        result.data['tasks'].forEach(task => {
          if (activity.id === task.activities_id)
          activity['tasks'].push( {"taskId": task["id"], "title" : task['name'], "start": new Date(), draggable:true });
        });
        if (activity['tasks'].length !== 0){
          this.activities.push( activity)
        }
      });
    });
  }

  miniCalendarDate = new Date();

}
