import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TitleService } from '../../../services/title.service';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  faCaretSquareLeft = faCaretSquareLeft

  constructor(private DataService: DataService, private TitleService: TitleService) { }
  roles
  departements
  ngOnInit() {
    this.DataService.getDepartements().subscribe((res) => {
      this.departements = res.data.departement
      console.log(this.departements)

    });
    this.DataService.getRoles().subscribe((res) => {
      this.roles = res.data
    })
    this.TitleService.setTitle("Nouvel utilisateur")
  }

  onFormSubmit(userForm: NgForm) {
    userForm.value.role_id = parseInt(userForm.value.role_id)
    userForm.value.departement_id = parseInt(userForm.value.departement_id)
    this.DataService.createUser(userForm.value).subscribe((res) => {
      console.log(res)
      console.log("user created");
    })
  }
}
