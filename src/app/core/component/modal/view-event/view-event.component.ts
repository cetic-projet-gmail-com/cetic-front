import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent implements OnInit {
  startHour;
  endHour;
  color;
  constructor(
    public dialogRef: MatDialogRef<ViewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    console.log(this.data)
    this.startHour =  this.data.event.start; //à formater
    this.endHour =  this.data.event.end; //aussi

    this.color = this.data.event.color.secondary;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
}
