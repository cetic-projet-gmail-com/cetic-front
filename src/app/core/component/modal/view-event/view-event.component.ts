import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { format } from 'date-fns';
import { DataService } from 'src/app/core/services/data.service';
import { RemoveEventComponent } from '../remove-event/remove-event.component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { fr } from 'date-fns/locale';


@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['../modal-scss/style.scss']
})
export class ViewEventComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faTimes = faTimes


  startHour;
  endHour;
  color;
  // hidden;
  activityName;
  takName;
  event;
  date;
  viewDate
  constructor(
    public dialogRef: MatDialogRef<ViewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private DataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    let event = this.data.event;
    this.startHour = format(event.start, 'HH:mm');
    this.endHour = format(event.end, 'HH:mm');
    this.date = new Date(event.start);
    this.takName = event.meta.taskName;
    this.activityName = event.meta.activityName;

    this.color = this.data.event.color.secondary;

    let day = this.upFirsChar(format(this.date, 'iiii', {
      locale: fr
    }));
    this.viewDate = `${this.upFirsChar(day)}  ${format(this.date, 'dd')} ${this.upFirsChar(format(this.date, 'MMMM', { locale: fr }))} ${format(this.date, 'yyyy')}`;
    // this.hidden = true;
  }

  onNoClick(): void {
    this.dialogRef.close();

  }
  edit() {
    this.dialogRef.close("edit");
  }
  upFirsChar(d) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  }
  remove() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit-event';

    let dialogRef = this.dialog.open(RemoveEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res === true) {
        this.dialogRef.close("removed");
      }
    })
  }
}
