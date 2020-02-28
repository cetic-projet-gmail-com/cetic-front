// import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/auth/authentification.service';
import { Router } from '@angular/router';


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
  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    }); 
  }
}