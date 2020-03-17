// import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/auth/authentification.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent /*implements OnInit */{
  credentials: TokenPayload = {
    login: '',
    password: ''
  };
  constructor(private auth: AuthenticationService, private router: Router, private snack: MatSnackBar) {}
  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['snackBar'];
    config.duration = 2000
        this.snack.open(message, 'ok', config);
  }
  login() {
    this.auth.login(this.credentials).subscribe((e) => {
      
      if (e) {
        this.router.navigateByUrl('/home');
      }
    }, (err) => {
      this.openSnackBar('Login ou mot de passe incorrect!');
    }); 
  }
}