import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {format, formatISO, addHours} from 'date-fns';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['../modal-scss/style.scss']
}) 


export class CreateEventComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();

    
  }
  viewDate;
  view  : number;
  res = {};
  activityFound : string;
  taskFound: string;
  ngOnInit() {
    
    if (this.data.taskId !== null) {
      this.view= 2;
      this.res['taskId'] = parseInt(this.data.taskId);
    } else {
      this.view = 1;
    }
    
    this.viewDate = format(this.data.date,'dd/MM/yy')
  }

  next(f) {
    this.view=2;
    this.data.activities.find(act => {
      return act['tasks'].some(tsk => tsk.id == f.value.tasks)
    });
    this.activityFound = this.data.activities.find(act =>  
      act['tasks'].some(t => 
        t.taskId === parseInt(f.value.tasks)
      )
    );
    this.taskFound = this.activityFound['tasks'].find(tsk => 
      tsk.taskId === parseInt(f.value.tasks)
    );
   
    let taskId = parseInt(f.value.tasks) ;
    this.res['taskId'] = taskId;
  }
  submit(f) {
    // this.res['color'] = this.data.activities.find(e => e['tasks'].some(e => e.taskId === this.res['taskId'])).color_code;
    let start, end, description;
    ({ start, end, description } = f.value)
    this.res['description'] = description;
    let date = this.data.date
    this.res['start'] = formatISO(addHours(new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), start.split(':')[0], start.split(':')[1]),1));
    
    this.res['end'] = formatISO(addHours(new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), end.split(':')[0], end.split(':')[1]), 1));

    this.dialogRef.close(this.res)
  }
}
