import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { format, formatISO } from 'date-fns';

import { EventForm } from 'src/app/core/models/Event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventForm,
    private fb: FormBuilder
  ) {}

  formEditEvent = this.fb.group({
    description: ['', Validators.required],
    startAt: ['', Validators.required],
    endAt: ['', Validators.required],
  });

  event!: CalendarEvent;
  date!: Date;

  ngOnInit() {
    this.date = this.data.start;
    let formData = {
      description: this.data.title,
      startAt: format(this.data.start, 'HH:mm'),
      endAt: format(this.data.end, 'HH:mm'),
    };

    this.formEditEvent.disable();
    this.formEditEvent.setValue(formData);
    // this.event = this.data.event;
    // let hourForm = 'HH:mm';
    // this.date = new Date(this.event.start);
    // this.startText = format(new Date(this.event.start), hourForm);
    // this.endText = format(new Date(this.event.end), hourForm);
    // let day = this.upFirsChar(format(this.date, 'iiii'));
    // this.viewDate = `${this.upFirsChar(day)}  ${format(
    //   this.date,
    //   'dd'
    // )} ${this.upFirsChar(format(this.date, 'MMMM'))} ${format(
    //   this.date,
    //   'yyyy'
    // )}`;
  }
  handleClose(): void {
    this.dialogRef.close();
  }

  handleSubmit(): void {
    if (!this.formEditEvent.valid) return;

    try {
    } catch (error) {
    } finally {
    }
  }
  // viewDate;
  // date: Date;
  // startText: string;
  // endText: string;
  // res = {};
  // // end = format(event['end'], this.hourForm);

  // upFirsChar(d) {
  //   return d.charAt(0).toUpperCase() + d.slice(1);
  // }
  // submit(f) {
  //   let start, end, description;
  //   ({ start, end, description } = f.value);
  //   let date = new Date(this.event.start);

  //   this.res['startAt'] = formatISO(
  //     /*addHours(*/ new Date(
  //       date.getFullYear(),
  //       date.getMonth(),
  //       date.getDate(),
  //       start.split(':')[0],
  //       start.split(':')[1]
  //     ) /*, 1)*/
  //   );
  //   this.res['endAt'] = formatISO(
  //     /*addHours(*/ new Date(
  //       date.getFullYear(),
  //       date.getMonth(),
  //       date.getDate(),
  //       end.split(':')[0],
  //       end.split(':')[1]
  //     ) /*, 1)*/
  //   );
  //   this.res['description'] = description;
  //   // this.res['taskId'] = this.event.meta['taskId'];
  //   if (this.res['startAt'] > this.res['endAt']) {
  //   } else {
  //     this.dialogRef.close(this.res);
  //   }
  // }
}
