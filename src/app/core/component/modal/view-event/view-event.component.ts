import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {format} from 'date-fns';
import { DataService } from 'src/app/core/services/data.service';
@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  startHour;
  endHour;
  color;
  hidden;
  activityName;
  takName;
  event;
  date;
  constructor(
    public dialogRef: MatDialogRef<ViewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private DataService : DataService) {}

  ngOnInit() {
    let event = this.data.event;
    this.startHour = format( event.start, 'HH:mm'); 
    this.endHour =  format(event.end, 'HH:mm');
    this.date = format(event.start, 'dd/MM/yyyy')
    this.takName = event.meta.taskName;
    this.activityName = event.meta.activityName;
    
    this.color = this.data.event.color.secondary;
    this.hidden = true;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  edit() {
    this.dialogRef.close("edit");
  }
  remove() {
    this.dialogRef.close("removed");
  }
}
