import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHomeService {
  constructor(private http: HttpService) {}

  public getEvents() {
    return this.http.get('event');
  }
  public getActivities() {
    return this.http.get('admin/activity');
  }
  public getProfile() {
    return this.http.get('profile');
  }
  public updateProfile(form: object) {
    return this.http.patch('profile', form);
  }
}
