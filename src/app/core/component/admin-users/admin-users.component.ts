
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleService } from './../../services/title.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  faAdd = faPlusSquare;
  faEdit = faEdit;
  faTrash = faTrash;
  num;
  tab;


  constructor(private DataService: DataService, private http: HttpClient, private TitleService: TitleService, public router: Router) {
    // this.tab = "user";
    console.log(this.tab)
    this.num = 0;
  }

  user
  act
  ngOnInit() {
    this.DataService.getActivities().subscribe((res) => {
      this.act = res.data.activities
      console.log(this.act);
    });
    this.DataService.getAdminUsers().subscribe((res) => {
      console.log(res);
      this.user = res.data.users
      console.log(this.user)

    });

    this.TitleService.setTitle("Administration")
  }
  setRoute(tab: String) {
    this.tab = tab;
  }



}