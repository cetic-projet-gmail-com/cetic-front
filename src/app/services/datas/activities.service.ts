import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activities } from '../../models/activities';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }
  public apiUrl = '';
  public getActivities(url?: string) {
    return this.http.get<Activities[]>(`${this.apiUrl}/administration/activities`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public getActivityById(id: number) {
    if (id) {
      return this.http.get<Activities>(`${this.apiUrl}/administration/activities/${id}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
    }
  }

  public createActivity(activity: Activities) {
    return this.http.post(`${this.apiUrl}/administration/activities`, activity, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }


  public updateActivity(activity: Activities, id) {
    return this.http.patch(`${this.apiUrl}/administration/activities/${id}`, activity, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public deleteActivity(id: number) {
    return this.http.delete(`${this.apiUrl}/administration/activities/${id}`, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
}
