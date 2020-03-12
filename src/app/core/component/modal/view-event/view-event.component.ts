import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {format} from 'date-fns';
import { DataService } from 'src/app/core/services/data.service';
import { RemoveEventComponent } from '../remove-event/remove-event.component';
import { fr } from 'date-fns/locale';
@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['../modal-scss/style.scss']
})
export class ViewEventComponent implements OnInit {
  startHour;
  endHour;
  color;
  // hidden;
  activityName;
  takName;
  event;
  date;
  constructor(
    public dialogRef: MatDialogRef<ViewEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private DataService : DataService, private dialog: MatDialog) {}

  ngOnInit() {
    let event = this.data.event;
    this.startHour = format( event.start, 'HH:mm'); 
    this.endHour =  format(event.end, 'HH:mm');
    this.date = format(event.start, 'dd/MM/yyyy')
    this.takName = event.meta.taskName;
    this.activityName = event.meta.activityName;
    
    this.color = this.data.event.color.secondary;

    let day  =this.upFirsChar(format(event.start, 'iiii', {locale: fr}));
    this.date = `${this.upFirsChar(day)}  ${format(event.start, 'dd')} ${this.upFirsChar(format(event.start, 'MMMM', {locale: fr}))} ${format(event.start, 'yyyy')}`;
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
      } else {
        this.dialogRef.close();
      }
    })
  }
}
