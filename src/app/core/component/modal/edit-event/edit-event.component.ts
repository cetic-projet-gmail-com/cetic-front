import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { format, formatISO, addHours } from 'date-fns';
interface event {
  start: string,
  end: string,
  meta: Object,
  title: string
}


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['../modal-scss/style.scss']
})
export class EditEventComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  event: event;

  startText: string;
  endText: string;
  res = {};
  // end = format(event['end'], this.hourForm);
  ngOnInit() {
    this.event = this.data.event;
    let hourForm = 'HH:mm';
    this.startText = format(new Date(this.event.start), hourForm);
    this.endText = format(new Date(this.event.end), hourForm);
  }
  submit(f) {
    let start, end, description;
    ({ start, end, description } = f.value)
    let date = new Date(this.event.start);

    this.res['start'] = formatISO(addHours(new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), start.split(':')[0], start.split(':')[1]), 1));
    this.res['end'] = formatISO(addHours(new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), end.split(':')[0], end.split(':')[1]), 1));
    this.res['description'] = description;
    // this.res['taskId'] = this.event.meta['taskId'];

    this.dialogRef.close(this.res);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
