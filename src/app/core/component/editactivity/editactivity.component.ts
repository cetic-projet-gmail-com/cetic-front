import { DataService } from '../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


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


  constructor(private DataService: DataService, private TitleService: TitleService, public router: Router, private route: ActivatedRoute) { }

  act
  user

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.DataService.getActivityById(this.id).subscribe((res) => {
      console.log('test' + res)
      this.act = res.activity;
      // this.title = this.act.name;
      this.TitleService.setTitle(res.activity.name)

    });
    this.DataService.getAdminUsers("?paginate=false").subscribe((res) => {
      // console.log(res);
      this.user = res.users.users
      console.log(this.user)

    });

    this.DataService.getTasks().subscribe((res)=> {
      this.tasks = res.tasks
      console.log(this.tasks)
    })

    this.display = 'tasks';

  }
  setRoute(display: String) {
    this.display = display;
  }



}
