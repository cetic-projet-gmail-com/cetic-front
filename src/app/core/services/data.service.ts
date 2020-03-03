import { SimpleUser } from './../../models/simple-user';
import { Roles } from './../../models/roles';
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

  public getRoles(url?: string) {
    return this.httpClient.get<Roles>(`${this.apiURL}/administration/roles`);
  }

  public deleteUser(id: number) { 
    return this.httpClient.delete(`${this.apiURL}/administration/users/${id}`);
  }

  public getUserById(id: number) { 
    return this.httpClient.get<SimpleUser>(`${this.apiURL}/administration/users/${id}`);
  }

  public getUsers(url?: string) {
    return this.httpClient.get<Users>(`${this.apiURL}/profil`);
  }

  public getHome(url?: string) {
    return this.httpClient.get<Users>(`${this.apiURL}/home`);
  }

  public getAdminUsers(url?: string) {

    url = url ? url : '';
    return this.httpClient.get<Users>(`${this.apiURL}/administration/users${url}`);
  }

  public getActivities(url?: string) {
    return this.httpClient.get<Activities>(`${this.apiURL}/administration/activities`);
  }

  public getActivityById(id: number) {
    if (id) {
      return this.httpClient.get<Activities>(`${this.apiURL}/administration/activities/${id}`);
    }

  }

  public getDepartements(url?: string) {
    return this.httpClient.get<Departements>(`${this.apiURL}/administration/departements`);
  }

  public createUser(user: Users) {
    return this.httpClient.post(`${this.apiURL}/administration/users`, user);
  }

  public updateUser(user: Users) {
    return this.httpClient.put(`${this.apiURL}/administration/users`, user)
  }

}