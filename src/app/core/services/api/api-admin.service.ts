import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiAdminService {
  constructor(private http: HttpService) {}

  public getActivity(id: any) {
    return this.http.get('admin/activity/' + id);
  }

  public getActivities() {
    return this.http.get('admin/activity');
  }

  public getUser(id: any) {
    return this.http.get('admin/user/' + id);
  }
}
