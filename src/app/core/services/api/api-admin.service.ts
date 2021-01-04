import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiAdminService {
  constructor(private http: HttpService) {}

  public getActivities(): Observable<any> {
    return this.http.get('admin/activity');
  }

  public getUser(id: any): Observable<any> {
    return this.http.get('admin/user/' + id);
  }
}
