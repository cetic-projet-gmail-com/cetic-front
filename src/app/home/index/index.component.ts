import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiHomeService } from 'src/app/core/services/api/api-home.service';

import Activity from 'src/app/core/models/Activity';
import { Event } from 'src/app/core/models/Event';
import { EditEventComponent } from '../components/Dialogs/edit-event/edit-event.component';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;

  public events!: Observable<Event[]>;
  public activities!: Observable<Activity[]>;

  constructor(private api: ApiHomeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchData();
  }

  handleEditEvent($event: Event) {
    const dialogConfig = Object.assign(new MatDialogConfig(), {
      data: $event,
    });
    this.dialog.open(EditEventComponent, dialogConfig);
  }

  fetchData() {
    this.api.getEvents().subscribe(
      (events) => {
        this.events = events.data;
      },
      (error) => {}
    );
    this.api.getActivities().subscribe(
      (activities) => {
        this.activities = activities.data;
      },
      (error) => {}
    );
  }
}
