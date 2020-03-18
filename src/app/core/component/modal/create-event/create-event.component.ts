import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  format,
  formatISO,
  addHours,
  isAfter
} from 'date-fns';
import {
  fr
} from 'date-fns/locale';

import {
  faCaretSquareLeft
} from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['../modal-scss/style.scss']
})


export class CreateEventComponent implements OnInit {

  faCaretSquareLeft = faCaretSquareLeft
  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snack : MatSnackBar,
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  viewDate;
  view: number;
  res = {};
  activityFound: string;
  taskFound: string;
  ngOnInit() {

    if (this.data.taskId !== null) {
      this.view = 2;
      this.res['taskId'] = parseInt(this.data.taskId);
      this.next(null)
    } else {
      this.view = 1;
    }
    let day = this.upFirsChar(format(this.data.date, 'iiii', {
      locale: fr
    }));
    this.viewDate = `${this.upFirsChar(day)}  ${format(this.data.date, 'dd')} ${this.upFirsChar(format(this.data.date, 'MMMM', { locale: fr }))} ${format(this.data.date, 'yyyy')}`;

  }
  upFirsChar(d) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  }
  next(f) {
    this.view = 2;
    let taskId;
    if (f !== null) {
      taskId = parseInt(f.value.tasks);
    } else {
      taskId = parseInt(this.data.taskId);
    }
    this.activityFound = this.data.activities.find(act => {
      let taskTmp = act.tasks.find(t => t.id === taskId);
      if (taskTmp) {
        this.taskFound = taskTmp;
        return act;
      }
    });
    this.res['taskId'] = taskId;
  }
  submit(f) {
    

    let start, end, description;
    ({
      start,
      end,
      description
    } = f.value)
    this.res['description'] = description;
    let date = this.data.date
    this.res['startAt'] = formatISO(/*addHours(*/new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), start.split(':')[0], start.split(':')[1])/*,1)*/);
    this.res['endAt'] = formatISO(/*addHours(*/new Date((date).getFullYear(), (date).getMonth(), (date).getDate(), end.split(':')[0], end.split(':')[1])/*, 1)*/);

    if (this.res['startAt'] > this.res['endAt']){
      this.openSnackBar("L'heure de début doit être avant celle de fin!");
    } else {
      this.dialogRef.close(this.res);
    }
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackBar'];
    config.duration = 2000
        this.snack.open(message, 'ok', config);
  }
}
