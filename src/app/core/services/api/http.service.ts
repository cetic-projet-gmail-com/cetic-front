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

  private request(
    method: string,
    path: string,
    payload?: object,
    header?: object
  ) {
    const defaultPath = `${environment.apiUrl}/${path}`;

    const reqHeader = {
      headers: {
        ...this.token,
        ...header,
      },
    };

    try {
      switch (method) {
        case 'get':
          return this.http.get(defaultPath, reqHeader);
        case 'delete':
          return this.http.delete(defaultPath, reqHeader);
        case 'patch':
          return this.http.patch(defaultPath, payload, reqHeader);
        case 'post':
          return this.http.post(defaultPath, payload, reqHeader);
        case 'put':
          return this.http.put(defaultPath, payload, reqHeader);
        default:
          throw new Error();
      }
    } catch (error) {
      throw new Error();
    }
  }

  public delete = (path: string, header?: object) =>
    this.request('delete', path, {}, header);
  public get = (path: string, header?: object) =>
    this.request('get', path, {}, header);
  public patch = (path: string, payload?: object, header?: object) =>
    this.request('patch', path, payload, header);
  public post = (path: string, payload?: object, header?: object) =>
    this.request('post', path, payload, header);
  public put = (path: string, payload: object, header?: object) =>
    this.request('put', path, payload, header);
}
