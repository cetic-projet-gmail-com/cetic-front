import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private DataService: DataService) { }

  departements
  ngOnInit() {
    this.DataService.getDepartements().subscribe((res) => {
      this.departements = res.data.departement
      console.log(this.departements)

    });
  }
  onFormSubmit(userForm: NgForm) {
    userForm.value.role_id = parseInt(userForm.value.role_id)
    userForm.value.departement_id = parseInt(userForm.value.departement_id)
    this.DataService.createUser(userForm.value).subscribe((res)=>{
    console.log("user created");
    })
  }
}
