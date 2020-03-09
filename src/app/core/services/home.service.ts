import { Injectable } from '@angular/core';
import { CalendarView} from 'angular-calendar';
import { getWeek, getWeekYear, parseISO} from 'date-fns';
import { DataService } from './data.service';
import { el } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent} from 'angular-calendar';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private DataService: DataService) {}

  async getEvents(view, viewDate) {
    let events: CalendarEvent[] = [];
    let date = viewDate;
    date = new Date(date);
    let url = "";
    switch (view) {
      case CalendarView.Month:
        url = `?display=month&month=${date.getMonth() + 1}&year=${date.getFullYear()}`;
        break;
      case CalendarView.Week:
        url = `?display=week&week=${getWeek(viewDate)}&year=${getWeekYear(viewDate)}`;
        break;
      case CalendarView.Day:
        url = `?display=day&date=${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      default:
        url = "";
        break;
    }
    await this.DataService.getHome(url).subscribe(async (result) => {
      let json = result['data'];
      let colors;
      await json['events'].forEach(element => {
        try {
          colors =  json['activities'].find(activity => activity.id === json['tasks'].find(task => element.tasks_id === task.id).activities_id).color_code;
  
        } catch (error) {
          colors = '#8d8d8d';
        }
        events.push(  {
          "start": parseISO(element.start),
          "end": parseISO(element.end),
          "title": element.description,
          draggable:true,
          color : {primary: '#263238', secondary: colors},
          meta : {
            test: "test",
            id: element.id,
            taskId: element.tasks_id
          }
        });
        
      });
    });
    return events;
  }
}
