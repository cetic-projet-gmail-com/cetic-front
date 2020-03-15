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
  id;
  constructor(private DataService: DataService, private route: ActivatedRoute, private TitleService: TitleService) { }
  departments;
  roles;
  user;
  firstName: string
  lastName: string
  login: string
  mail: string

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.DataService.getDepartements().subscribe((res) => {
      this.departments = res.data.departments
    });

    this.DataService.getRoles().subscribe((res) => {
      this.roles = res.data
    });

    this.DataService.getUserById(this.id).subscribe((res) => {
      this.firstName = res.data.user.firstName
      this.lastName = res.data.user.lastName
      this.login = res.data.user.login
      this.mail = res.data.user.email
      this.TitleService.setTitle(`${this.firstName} ${this.lastName}`)
    });



  }
  onFormSubmit(userForm: NgForm) {
    userForm.value.roleId = parseInt(userForm.value.roleId)
    userForm.value.departmentId = parseInt(userForm.value.departmentId)

    this.DataService.updateUser(userForm.value, this.id).subscribe((res)=>{
      console.log(res)
    console.log("user updated");
    })
  }

}
