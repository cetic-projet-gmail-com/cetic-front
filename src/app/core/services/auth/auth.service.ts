import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public logging(credentials: object): Observable<any> {
    return this.http.post(this.apiUrl + '/login', credentials);
  }

  private token = 'bearerToken';

  public setToken(token: any) {
    localStorage.setItem(this.token, token);
  }
  public getToken() {
    const token = localStorage.getItem(this.token);
    return token ? atob(token.split('.')[1]) : null;
  }
  public getRawToken() {
    return localStorage.getItem(this.token);
  }
  public removeToken() {
    localStorage.removeItem(this.token);
  }
  public isLoggedIn(): boolean {
    return localStorage.getItem(this.token) !== null;
  }
}
