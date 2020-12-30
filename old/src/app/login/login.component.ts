import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import M from 'materialize-css';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {
    login: 'Admin',
    password: '123456'
  };
  constructor(
    private loginService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  login() {
    console.log(this.credentials);
    this.loginService.login(this.credentials).subscribe((e) => {
      if (e) {
        this.router.navigate(['home']);
      } else {
        M.toast({html: 'Login ou mot de passe incorrect!', classes: 'snackBar'})
      }
    });
  }
}
