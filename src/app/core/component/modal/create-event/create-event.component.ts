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
    console.log(this.data)
    
  }
  viewDate;
  view  : number;
  res:object = {
    tasks_id : "",
  };
  ngOnInit() {
    this.view= 1;
    console.log(this.data)
    
    this.viewDate = format(this.data.date,'dd/MM/yy')
  }

  next(f) {
    this.view=2;
    this.res['tasks_id'] = f.value.tasks;
  }
  submit(f) {
    let start, end, description;
    ({start, end, description} = f.value)
    this.res['description'] = description;
    this.res['start'] = start;
    this.res['end'] = end;
    this.res['date'] = this.data.date;

    console.log(this.res)


    this.dialogRef.close(this.res)
  }
}
