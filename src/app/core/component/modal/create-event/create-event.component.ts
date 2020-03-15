import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {format, formatISO, addHours} from 'date-fns';
import { fr } from 'date-fns/locale';
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
      this.next(null)
    } else {
      this.view = 1;
    } 
    let day  =this.upFirsChar(format(this.data.date, 'iiii', {locale: fr}));
    this.viewDate = `${this.upFirsChar(day)}  ${format(this.data.date, 'dd')} ${this.upFirsChar(format(this.data.date, 'MMMM', {locale: fr}))} ${format(this.data.date, 'yyyy')}`;

  }
  upFirsChar(d) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  }
  next(f) {
    this.view=2;
    let taskId;
    if (f !== null) {
      taskId = parseInt(f.value.tasks) ;
    } else {
      taskId = parseInt(this.data.taskId);
    }
    this.activityFound = this.data.activities.find(act =>  
      act['tasks'].some(t => 
        t.taskId === taskId
      )
    );
    this.taskFound = this.activityFound['tasks'].find(tsk => 
      tsk.taskId === taskId
    );
    this.res['taskId'] = taskId;
  }
  submit(f) {
    let start, end, description;
    ({ start, end, description } = f.value)
    this.res['description'] = description;
    let date = this.data.date
    this.res['startAt'] = formatISO(addHours(new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), start.split(':')[0], start.split(':')[1]),1));
    this.res['endAt'] = formatISO(addHours(new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), end.split(':')[0], end.split(':')[1]), 1));
    this.dialogRef.close(this.res)
  }
}
