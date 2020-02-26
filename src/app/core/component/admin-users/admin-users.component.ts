
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  constructor(private DataService: DataService) { }

  user
  ngOnInit() {
    this.DataService.getAdminUsers().subscribe((res) => {
      this.user = res.data.users
      console.log(this.user)

    });
  }

}