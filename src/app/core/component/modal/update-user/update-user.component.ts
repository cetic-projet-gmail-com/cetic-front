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
      this.departements = res.data.departement

    });

    this.DataService.getRoles().subscribe((res) => {
      this.roles = res.data
    });

    this.DataService.getUserById(this.id).subscribe((res) => {
      this.firstname = res.data.user.firstname
      this.lastname = res.data.user.lastname
      this.login = res.data.user.login
      this.mail = res.data.user.email
      this.TitleService.setTitle(`${this.firstname} ${this.lastname}`)
    });



  }
  onFormSubmit(userForm: NgForm) {
    userForm.value.role_id = parseInt(userForm.value.role_id)
    userForm.value.departement_id = parseInt(userForm.value.departement_id)

    this.DataService.updateUser(userForm.value, this.id).subscribe((res)=>{
      console.log(this.id)
    console.log("user updated");
    })
  }

}
