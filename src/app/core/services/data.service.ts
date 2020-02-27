import { Departements } from './../../models/departements';
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

  public updateUser(users: Users) { }

  public deleteUser(id: number) { }

  public getUserById(id: number) { }

  public getUsers(url?: string) {
    return this.httpClient.get<Users>(`${this.apiURL}/profil`);
  }

  public getHome(url?: string) {
    return this.httpClient.get<Users>(`${this.apiURL}/home`);
  }

  public getAdminUsers(url?: string) {
    return this.httpClient.get<Users>(`${this.apiURL}/administration/users?nbre=12`);
  }

  public getActivities(url?: string) {
    return this.httpClient.get<Activities>(`${this.apiURL}/administration/activities`);
  }

  public getDepartements(url?: string){
    return this.httpClient.get<Departements>(`${this.apiURL}/administration/departements`);
  }

  public createUser(user: Users){
    return this.httpClient.post(`${this.apiURL}/administration/users`,user);
}

}