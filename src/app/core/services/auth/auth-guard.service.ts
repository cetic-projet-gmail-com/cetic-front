import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifications: MatSnackBar
  ) {}
  canActivate(): boolean {
    const check = this.authService.isLoggedIn();

    if (!check) {
      this.router.navigateByUrl('/login');

      this.notifications.open(
        'Votre compte nest plus connecté, veuillez vous reconnecter !',
        'Cacher',
        {
          duration: 5000,
        }
      );
    }
    return check;
  }
}
@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdmin implements CanActivate {
  constructor(
    private authService: AuthService,
    private notifications: MatSnackBar
  ) {}

  canActivate(): boolean {
    const { role } = this.authService.getToken();
    const check = role > 1;
    if (!check) {
      this.notifications.open(
        'Vous ne pouvez pas accéder a cette page !',
        'Cacher',
        {
          duration: 5000,
        }
      );
    }

    return check;
  }
}
