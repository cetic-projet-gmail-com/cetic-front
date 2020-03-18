import { DataService } from 'src/app/core/services/data.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TitleService } from './../../services/title.service';
import { AuthenticationService, UserDetails } from '../../services/auth/authentification.service';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  faCaretSquareLeft = faCaretSquareLeft


  constructor(private DataService: DataService, private TitleService: TitleService, private snack: MatSnackBar) {

  }

  mailRgx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  passRgx= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  mailErr = 'Adresse mail incorrecte!';
  passErr = 'Mot de passe pas assez sécurisé!';
  user;

  ngOnInit() {
    this.DataService.profile().subscribe(users => {
      this.user = users['user'];
      this.TitleService.setTitle(`${this.user['lastName']} ${this.user['firstName']}`);

    });
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackBar'];
    config.duration = 2000
        this.snack.open(message, 'ok', config);
  }

  onFormSubmit(form) {
    let f = form.value;
    let sub = {};
    let send = false;
    if (f.email !== '') {
      let test = this.mailRgx.test(f.email);
      send =true
      test ? sub["email"] = f.email: this.openSnackBar(this.mailErr);
      if (!test) send = false;
    }
    if (f.password !== '') {
      let test = this.mailRgx.test(f.password);
      send = true
      test ? sub["email"] = f.email: this.openSnackBar(this.passErr);
      if (!test) send = false;
    }
    if (sub !== {} && send === true) {
      this.DataService.postProfile(sub).subscribe(async res => {
        await res;
        if (res.status == 200) {
          this.openSnackBar('profil mis à jour');
        } else {
          this.openSnackBar('Infos incorectes');
        }
      });
    }

  }
  
}