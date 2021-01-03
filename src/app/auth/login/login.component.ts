import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private notification: MatSnackBar
  ) {}

  formLogin = this.fb.group({
    login: ['', Validators.required],
    password: ['password', Validators.required],
  });

  badCredentials = false;
  state = {
    isHidingPassword: true,
  };

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
          this.notification.open(
            'Login ou mot de passe incorrect !',
            'Cacher',
            {
              duration: 2000,
            }
          );
        } else {
          this.notification.open(
            'Problème de communiquation avec le serveur. Veuillez contactez un admin !',
            'Cacher',
            {
              duration: 2000,
            }
          );
        }
      }
    );
  }

  ngOnInit(): void {}
}
