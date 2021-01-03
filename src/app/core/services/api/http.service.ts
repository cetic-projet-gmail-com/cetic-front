import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private token = { Authorization: 'Bearer ' + this.auth.getRawToken() };

  private request(method: string, path: string, payload?: object) {
    const defaultPath = `${environment.apiUrl}/${path}`;

    const header = {
      headers: {
        ...this.token,
        ...payload,
      },
    };

    switch (method) {
      case 'get':
        return this.http.get(defaultPath, header);
      case 'delete':
        return this.http.delete(defaultPath, header);
      case 'patch':
        return this.http.patch(defaultPath, header);
      case 'post':
        return this.http.post(defaultPath, header);
      case 'put':
        return this.http.put(defaultPath, header);
      default:
        throw new Error();
    }
  }

  public delete = (path: string, payload?: object) =>
    this.request('delete', path, payload);
  public get = (path: string, payload?: object) =>
    this.request('get', path, payload);
  public patch = (path: string, payload?: object) =>
    this.request('patch', path, payload);
  public post = (path: string, payload?: object) =>
    this.request('post', path, payload);
  public put = (path: string, payload?: object) =>
    this.request('put', path, payload);
}
