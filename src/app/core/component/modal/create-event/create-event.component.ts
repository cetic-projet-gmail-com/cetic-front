import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {format} from 'date-fns';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})


export class CreateEventComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
  
  onNoClick(): void {
    this.dialogRef.close();

    // console.log(this.data)
    
  }
  viewDate;
  view  : number;
  res:object = {
    tasks_id : "",
  };
  ngOnInit() {

    if (this.data.taskId !== null) {
      this.view= 2;
      this.res['tasks_id'] = parseInt(this.data.taskId);
    } else {
      this.view= 1;
    }
    
    this.viewDate = format(this.data.date,'dd/MM/yy')
  }

  next(f) {
    this.view=2;
    let taskId = parseInt(f.value.tasks) ;
    this.res['tasks_id'] = taskId;
  }
  submit(f) {
    this.res['color'] = this.data.activities.find(e => e['tasks'].some(e => e.taskId === this.res['tasks_id'])).color_code;
    let start, end, description;
    ({start, end, description} = f.value)
    this.res['description'] = description;
    let date = this.data.date
    this.res['start'] = new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), start.split(':')[0], start.split(':')[1]);
    
    this.res['end'] = new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), end.split(':')[0], end.split(':')[1]);;

    this.dialogRef.close(this.res)
  }
}
