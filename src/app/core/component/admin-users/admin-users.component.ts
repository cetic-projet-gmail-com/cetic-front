import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleService } from './../../services/title.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';



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


  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    // return orderBy(value, [column], [order]);
  }



  constructor(private DataService: DataService, private http: HttpClient, private TitleService: TitleService,
    public router: Router, private ActivatedRoute: ActivatedRoute) {
    this.num = 0;

  }
  user
  act
  currentPage : string
  nextPage: string
  previousPage: string
  firstPage: string
  lastPage: string
  dep
  url =this.DataService.apiURL
  ngOnInit() {
    this.DataService.getActivities().subscribe((res) => {
      this.act = res.data.activities
    });
    this.DataService.getAdminUsers("?paginate=true").subscribe((res) => {
      this.currentPage = res.links.current
      this.nextPage = res.links.next
      this.previousPage = res.links.previous
      this.lastPage = res.links.last
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

  deleteUsers(id) {

    this.DataService.deleteUser(id).subscribe((res) => {
    })

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

  deleteDep(id) {

    this.DataService.deleteDepartement(id).subscribe((res) => {
    })

  }
  deleteAct(id) {

    this.DataService.deleteActivity(id).subscribe((res) => {
    })

  }

  nextpage(){
    this.DataService.getPage(this.nextPage).subscribe((res) => {
      this.currentPage = res.links.current
      this.nextPage = res.links.next
      this.previousPage = res.links.previous
      this.lastPage = res.links.last
      this.user = res.data.users
      this.firstPage = res.links.first
      
    });
  }
  previouspage(){
    this.DataService.getPage(this.previousPage).subscribe((res) => {
      this.currentPage = res.links.current
      this.nextPage = res.links.next
      this.previousPage = res.links.previous
      this.lastPage = res.links.last
      this.firstPage = res.links.first
      this.user = res.data.users
    });
  }
  lastpage(){
    this.DataService.getPage(this.lastPage).subscribe((res) => {
      this.currentPage = res.links.current
      this.nextPage = res.links.next
      this.previousPage = res.links.previous
      this.lastPage = res.links.last
      this.firstPage = res.links.first
      this.user = res.data.users
      
    });
  }
  firstpage(){
    this.DataService.getPage(this.firstPage).subscribe((res) => {
      this.firstPage = res.links.first
      this.currentPage = res.links.current
      this.nextPage = res.links.next
      this.previousPage = res.links.previous
      this.lastPage = res.links.last
      this.user = res.data.users
      
    });
  }

}