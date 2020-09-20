import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersService } from './datas/users.service';

import { User } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private db: UsersService
  ) { }
  private token: string;

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }
  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }
  public getUserDetails(): User {
    const token = this.getToken();
    if (token) {
      return JSON.parse(token);
    } else {
      return null;
    }
  }

  public login(_user) : Observable<any> {

    return this.db.getUsers().pipe(
      map((users) => {
        let bool = true;
        console.log(users)
        let user = users.find(u => u.login === _user.login);
        if (user) {
          bool = user['password'] === _user['password'];
        } else {
          
          bool = false;
        }
        bool ? this.saveToken(JSON.stringify(user)) : '';
        return bool;
      })

    );

  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      // return user.exp > Date.now() / 1000;
      return true;
    } else {
      return false;
    }
  }
}
