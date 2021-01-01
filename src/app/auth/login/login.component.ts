import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  formLogin = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  badCredentials = false;

  handleSubmit(): void {
    if (!this.formLogin.valid) return;
    this.auth.logging(this.formLogin.value).subscribe(
      (res) => {
        this.auth.setToken(res.bearerToken);
        this.router.navigateByUrl('/');
      },
      (error) => {
        if (error.status === 401) {
          this.badCredentials = true;
        }
      }
    );
  }

  ngOnInit(): void {
    console.log();
  }
}
