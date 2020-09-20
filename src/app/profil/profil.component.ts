import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/datas/users.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user = {};

  form = this.fb.group({
    lastName: [''],
    firstName: [''],
    login: [''],
    email: [''],
    password: [''],
    roleId: [''],
    departmentId: [''],
    id: ['']
  });

  constructor(
    private usersService: UsersService,
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    let {id} = this.auth.getUserDetails();

    this.usersService.getUser(id.toString()).subscribe(
      user => this.form.setValue(user)

    )
  }
  onFormSubmit() {

  }

}
