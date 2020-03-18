import { DataService } from '../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateTaskComponent } from '../modal/create-task/create-task.component';
import { AddUserActivityComponent } from '../modal/add-user-activity/add-user-activity.component';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './editactivity.component.html',
  styleUrls: ['./editactivity.component.scss']
})
export class EditActivityComponent implements OnInit {

  faFileExport = faFileExport
  faCaretSquareLeft = faCaretSquareLeft
  faAdd = faPlusSquare
  faEdit = faEdit
  faTrash = faTrash

  tab;
  id;
  display;
  activity;
  tasks
  title: string;


  constructor(private DataService: DataService, private TitleService: TitleService, public router: Router, private route: ActivatedRoute, 
    private dialog: MatDialog ) { }

  act
  user

  status

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.DataService.getActivityById(this.id).subscribe((res) => {
      // console.log('-------')
      // console.log( res)
      this.act = res.activity;
      this.tasks = this.act['tasks'];
      this.user = this.act['users'];
      // this.title = this.act.name;
      this.TitleService.setTitle(res.activity.name)
      if (this.act.ended == false) {
        return this.status = "En cours"
      } else {
        return this.status = "Terminée"

      }

    });
    // this.DataService.getAdminUsers("?paginate=false").subscribe((res) => {
    //   // console.log(res);
    //   this.user = res.users.users
    //   console.log(this.user)

    // });

    // this.DataService.getTasks().subscribe((res) => {
    //   this.tasks = res.tasks
    //   console.log(this.tasks)
    // })

    this.display = 'tasks';

  }
  setRoute(display: String) {
    this.display = display;
  }

  addItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit-event';
    dialogConfig.data = event;
    if (this.display === "users") {
      
      let dialogRef = this.dialog.open(AddUserActivityComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        let res = {
          "activityId" : this.route.snapshot.params['id'],
          "userId" : result
        }
        this.DataService.addUserActivity(res).subscribe(async resServer => {
          await resServer;
          if (resServer.status === 200) {
            console.log('true')
          }
        });
      });
    } else if (this.display === "tasks") {
      let dialogRef = this.dialog.open(CreateTaskComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        result['activityId'] = this.route.snapshot.params['id'];

        // console.log(result)
        this.DataService.createTask(result).subscribe(async (res) => {
          await res;
          if (res.status === 200) {
            this.tasks = [...this.tasks, result];
          }
        }
        )
      });
    }
  } 
  rmTask(id) {
    this.DataService.deleteTask(id).subscribe(async res => {
      await res;
      if (res.status === 200 ) {
        let task = this.tasks.findIndex(t => t.id === id);
        this.tasks.splice(task, 1);
      }
    });
  }


}
