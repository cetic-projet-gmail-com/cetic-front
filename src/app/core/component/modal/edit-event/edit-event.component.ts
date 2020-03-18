import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { format, formatISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

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
    @Inject(MAT_DIALOG_DATA) public data,
    private snack : MatSnackBar) { }

  event: event;
  viewDate
  date: Date;
  startText: string;
  endText: string;
  res = {};
  // end = format(event['end'], this.hourForm);
  ngOnInit() {
    this.event = this.data.event;
    let hourForm = 'HH:mm';
    this.date = new Date(this.event.start);
    this.startText = format(new Date(this.event.start), hourForm);
    this.endText = format(new Date(this.event.end), hourForm);
    let day = this.upFirsChar(format(this.date, 'iiii', {
      locale: fr
    }));
    this.viewDate = `${this.upFirsChar(day)}  ${format(this.date, 'dd')} ${this.upFirsChar(format(this.date, 'MMMM', { locale: fr }))} ${format(this.date, 'yyyy')}`;
  }
  upFirsChar(d) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  }
  submit(f) {
    let start, end, description;
    ({ start, end, description } = f.value)
    let date = new Date(this.event.start);

    this.res['startAt'] = formatISO(/*addHours(*/new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), start.split(':')[0], start.split(':')[1])/*, 1)*/);
    this.res['endAt'] = formatISO(/*addHours(*/new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), end.split(':')[0], end.split(':')[1])/*, 1)*/);
    this.res['description'] = description;
    // this.res['taskId'] = this.event.meta['taskId'];
    if (this.res['startAt'] > this.res['endAt']){
      this.openSnackBar("L'heure de début doit être avant celle de fin!");
    } else {
      this.dialogRef.close(this.res);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackBar'];
    config.duration = 2000
        this.snack.open(message, 'ok', config);
  }
}
