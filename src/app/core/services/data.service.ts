import { Activities } from './../../models/activities';
import { Users } from '../../models/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiURL = 'http://localhost:3000'
  constructor(private httpClient: HttpClient) {
  }
  
  public createUser(users: Users){}

  public updateUser(users: Users){}
  
  public deleteUser(id: number){}
  
  public getUserById(id: number){}
  
  public getUsers(url?: string){
    return this.httpClient.get<Users>(`${this.apiURL}/profil`);
  }

  public getHome(url?: string){
    return this.httpClient.get<Users>(`${this.apiURL}/home`);
  }

  public getAdminUsers(url?: string){
    return this.httpClient.get<Users>(`${this.apiURL}/administration/users`);
  }

  public getActivities(url?: string){
    return this.httpClient.get<Activities>(`${this.apiURL}/administration/activities`);
  }


}