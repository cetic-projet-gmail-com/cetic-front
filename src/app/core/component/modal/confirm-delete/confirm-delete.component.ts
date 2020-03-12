import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../../services/data.service';
import { Router } from '@angular/router';




@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {

  @Input() isDelete;
  @Input() act;
  @Input() users;
  @Input() dep;
  @Output() reset = new EventEmitter()
  @Input() itemToDelete


  constructor(private DataService: DataService, private http: HttpClient, public router: Router) {

  }

  deleteUsers(id) {
    // console.log(this.itemToDelete);
    this.DataService.deleteUser(this.itemToDelete.id).subscribe((res) => {
      console.log("user deleted (refresh la page)")
      this.cancel()

    })

  }


  deleteDep(id) {

    console.log(this.itemToDelete);

    this.DataService.deleteDepartement(this.itemToDelete.id).subscribe((res) => {
      console.log(res)
      console.log("Departement deleted (refresh la page)")
      this.cancel()

    })

  }
  deleteAct(id) {

    console.log(this.itemToDelete);
    this.DataService.deleteActivity(this.itemToDelete.id).subscribe((res) => {
      console.log(res)
      console.log("Activity deleted (refresh la page)")
      this.cancel()

    })

  }

  cancel() {
    this.isDelete = !this.isDelete
    this.reset.emit()
  }

}
