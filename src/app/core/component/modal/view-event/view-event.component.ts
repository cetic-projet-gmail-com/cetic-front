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
  constructor(
    public dialogRef: MatDialogRef<ViewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private DataService : DataService) {}

  ngOnInit() {
    // console.log(this.data)
    this.startHour = format( this.data.event.start, 'HH:mm'); 
    this.endHour =  format(this.data.event.end, 'HH:mm');

    this.color = this.data.event.color.secondary;

    this.hidden = true;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }

  async remove() {
    // console.log(this.data)
    this.DataService.deleteEvent(this.data.event['meta'].id).subscribe()
    this.dialogRef.close("removed");
  }
}
