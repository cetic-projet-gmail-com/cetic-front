import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-remove-event',
  templateUrl: './remove-event.component.html',
  styleUrls: ['../modal-scss/style.scss']
})
export class RemoveEventComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RemoveEventComponent>) { }

  ngOnInit() {
  }
  onNoClick() {
    this.dialogRef.close();
  }
  remove() {
    this.dialogRef.close(true);
  }
}
