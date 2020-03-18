import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  constructor(private DataService : DataService, public dialogRef: MatDialogRef<CreateTaskComponent>, private snack: MatSnackBar) { }

  ngOnInit() {

  }
  onFormSubmit(taskForm: NgForm) {
    let {name, description} = taskForm.value;
    if (name && description) {
      this.dialogRef.close(taskForm.value);
    } else {
      this.openSnackBar('veuillez remplir tous les champs!');
    }
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackBar'];
    config.duration = 2000
    this.snack.open(message, 'ok', config);
  }


}
