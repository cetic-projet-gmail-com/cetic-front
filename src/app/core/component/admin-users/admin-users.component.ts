
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleService } from './../../services/title.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';






@Component({
  selector: 'admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],

})


export class AdminUsersComponent implements OnInit {
  faAdd = faPlusSquare;
  faEdit = faEdit;
  faTrash = faTrash;
  up = faSortUp;
  down = faSortDown;


  num;
  tab;
  order = "id"
  sens = true;
  sensName = true;
  sensRole = true;
  sensDep = true;




  constructor(private DataService: DataService, private http: HttpClient, private TitleService: TitleService, public router: Router) {
    // this.tab = "user";
    // console.log(this.tab)
    this.num = 0;

  }

  user
  act
  dep
  ngOnInit() {
    this.DataService.getActivities().subscribe((res) => {
      this.act = res.data.activities
    });
    this.DataService.getAdminUsers().subscribe((res) => {
      // console.log(res);
      this.user = res.data.users
      // console.log(this.user)
      console.log(this.user);

    });

    this.DataService.getDepartements().subscribe((res) => {
      console.log(res);
      this.dep = res.data.departement
    })
    this.TitleService.setTitle("Administration")

    // console.log(this.act);


  }
  setRoute(tab: String) {
    this.tab = tab;
  }

  isHidden = true;

  hidden() {
    this.isHidden = !this.isHidden
  }



  sort(el) {
    // console.log(e.target)
    // console.log(this.user);
    // e.target.classList.add('red')
    this.order = el
    switch (el) {
      case "firstname":
        this.sens = true;
        this.sensName = !this.sensName
        this.sens = this.sensName
        break;
      case "role":
        this.sens = true;
        this.sensRole = !this.sensRole
        this.sens = this.sensRole

        break;
      case "departement":
        this.sens = true;
        this.sensDep = !this.sensDep
        this.sens = this.sensDep

        break;
    }


  }





}