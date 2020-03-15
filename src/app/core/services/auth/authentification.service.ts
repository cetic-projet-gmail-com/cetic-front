import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  login: string;
  exp: number;
  iat: number;
  firstName: string;
  lastName: string;
  role: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  login: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

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

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public login(user: TokenPayload): Observable<any> {
    return this.http.post(`http://localhost:3000/login`, user).pipe(
      map((data: TokenResponse) => {
        console.log(data)
        if (data.token) {
          this.saveToken(data.token);
          
        } 
        return data;
      })
    );

  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }
}

