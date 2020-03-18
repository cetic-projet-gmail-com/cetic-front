import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TitleService } from '../../../services/title.service';


@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  id
  constructor(private DataService: DataService, private route: ActivatedRoute, private TitleService: TitleService) { }
  departements
  roles
  user
  firstname: string
  lastname: string
  login: string
  mail: string

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.DataService.getDepartements().subscribe((res) => {
      this.departements = res.departments

    });

    this.DataService.getRoles().subscribe((res) => {
      this.roles = res.roles
    });

    this.DataService.getUserById(this.id).subscribe((res) => {
      this.firstname = res.user.user.firstName
      this.lastname = res.user.user.lastName
      this.login = res.user.user.login
      this.mail = res.user.user.email
      this.TitleService.setTitle(`${this.firstname} ${this.lastname}`)
    });



  }
  onFormSubmit(userForm: NgForm) {
    userForm.value.roleId = parseInt(userForm.value.roleId)
    userForm.value.departmentId = parseInt(userForm.value.departementId)

    this.DataService.updateUser(userForm.value, this.id).subscribe((res)=>{
      console.log(res)
    console.log("user updated");
    })
  }

}
