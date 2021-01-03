import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiHomeService {
  constructor(private http: HttpService) {}

  public getEvents(): Observable<any> {
    return this.http.get('event');
  }
  public getActivities(): Observable<any> {
    return this.http.get('admin/activity');
  }
  public getProfile(): Observable<any> {
    return this.http.get('profile');
  }
  public updateProfile(form: object): Observable<any> {
    return this.http.patch('profile', form);
  }
}
