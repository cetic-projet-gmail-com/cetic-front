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
    console.log(this.data)
    
    this.viewDate = format(this.data.date,'dd/MM/yy')
  }

  next(f) {
    this.view=2;
    this.res['tasks_id'] = parseInt(f.value.tasks);
    try {
      console.log(f.value.tasks)
      this.res['color'] = this.data.activities.find(e => f.value.tasks === e['tasks'].map(e=>e).id);
      console.log(this.res['color']);
    } catch (error) {
      this.dialogRef.close();
    }
  }
  submit(f) {
    let start, end, description;
    ({start, end, description} = f.value)
    this.res['description'] = description;
    this.res['start'] = new Date((this.data.date).getFullYear(), (this.data.date).getMonth(), (this.data.date).getDate(), start.split(':')[0], start.split(':')[1]);
    
    this.res['end'] = new Date((this.data.date).getFullYear(), (this.data.date).getMonth(), (this.data.date).getDate(), end.split(':')[0], end.split(':')[1]);;

    this.dialogRef.close(this.res)
  }
}
