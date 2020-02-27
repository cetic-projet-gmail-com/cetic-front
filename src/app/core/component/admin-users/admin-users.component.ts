
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleService } from './../../services/title.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  faAdd = faPlusSquare;
  faEdit = faEdit;
  faTrash = faTrash;
  num = 0
  tab;


  constructor(private DataService: DataService, private http: HttpClient, private TitleService: TitleService) {
    this.tab = "user";
  }

  user
  ngOnInit() {
    this.DataService.getAdminUsers().subscribe((res) => {
      this.user = res.data.users
      console.log(this.user)

    });

    this.TitleService.setTitle("Administration")
  }




}