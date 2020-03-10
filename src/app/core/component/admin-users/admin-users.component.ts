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



  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    // return orderBy(value, [column], [order]);
  }



  constructor(private DataService: DataService, private http: HttpClient, private TitleService: TitleService, public router: Router) {
    // this.tab = "user";
    // console.log(this.tab)
    this.num = 0;

  }

  user
  act
  dep

  ngOnInit() {
    this.showData()
  }

  showData() {
    console.log('TEST');
    this.DataService.getActivities().subscribe((res) => {
      this.act = res.data.activities
    });
    this.DataService.getAdminUsers().subscribe((res) => {
      this.user = res.data.users
    });

    this.DataService.getDepartements().subscribe((res) => {
      this.dep = res.data.departement
    })
    this.TitleService.setTitle("Administration")
  }

  setRoute(tab: String) {
    this.tab = tab;
  }

  isHidden = true;

  hidden() {
    this.isHidden = !this.isHidden
  }

  isDelete = true
  itemToDelete


  popUpDeleted(e, u) {

    this.isDelete = !this.isDelete
    this.itemToDelete = u;

  }



  order = "id"
  sens = true;
  sensName = true;
  sensFname = true;
  sensRole = true;
  sensDep = true;
  sensRes = true;
  sensChef = true;
  sensType = true;
  sensStatus = true;


  sort(el) {
    // console.log(e.target)
    // console.log(this.user);
    // e.target.classList.add('red')
    this.order = el
    switch (el) {
      case "firstname":
        this.sens = true;
        this.sensFname = !this.sensFname
        this.sens = this.sensFname
        break;
      case "name":
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
      case "name":
        this.sens = true;
        this.sensName = !this.sensName
        this.sens = this.sensName
        break;
      case "responsable_id":
        this.sens = true;
        this.sensRes = !this.sensRes
        this.sens = this.sensRes
        break;
      case "chef":
        this.sens = true;
        this.sensChef = !this.sensChef
        this.sens = this.sensChef
        break;
      case "type":
        this.sens = true;
        this.sensType = !this.sensType
        this.sens = this.sensType
        break;
      case "status":
        this.sens = true;
        this.sensStatus = !this.sensStatus
        this.sens = this.sensStatus
        break;
    }
  }


  refresh() {
    this.isDelete = !this.isDelete;
    setTimeout(() => {
      this.showData();
    }, 500);
  }

}