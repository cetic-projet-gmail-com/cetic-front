import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-move-event',
  templateUrl: './move-event.component.html',
  styleUrls: ['../modal-scss/style.scss']
})
export class MoveEventComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MoveEventComponent>) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  modify() {
    this.dialogRef.close(true);
  }
}
