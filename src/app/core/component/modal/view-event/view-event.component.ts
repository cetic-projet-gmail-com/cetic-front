import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {format} from 'date-fns';
import { DataService } from 'src/app/core/services/data.service';
import { RemoveEventComponent } from '../remove-event/remove-event.component';

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
    // this.hidden = true;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  edit() {
    this.dialogRef.close("edit");
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
