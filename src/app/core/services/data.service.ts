import { PageLink } from './../../models/page-link';
import { SimpleActivity } from './../../models/simple-activity';
import { SimpleDepartement } from './../../models/simple-departement';
import { Color } from './../../models/color';
import { Type } from './../../models/type';
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

/* --------------------------------- OTHERS --------------------------------- */

  public getTypes(url?: string) {
    return this.httpClient.get<Type>(`${this.apiURL}/administration/atypes`);
  }

  public getColors(url?: string) {
    return this.httpClient.get<Color>(`${this.apiURL}/administration/colors`);
  }

  public getRoles(url?: string) {
    return this.httpClient.get<Roles>(`${this.apiURL}/administration/roles`);
  }

  public getHome(url?: string) {
    url = url? url: "";
    return this.httpClient.get<Users>(`${this.apiURL}/home${url}`);
  }

  
  public getAdminUsers( url:string ) {
    url = url? url: "";
    return this.httpClient.get<Users>(`${this.apiURL}/administration/users${url}`);
  }

  public getPage(url:string) {

    return this.httpClient.get<PageLink>(`${this.apiURL+url}`);
  }



  /* -------------------------------- ACTIVITY -------------------------------- */


  public getActivities(url?: string) {
    return this.httpClient.get<Activities>(`${this.apiURL}/administration/activities`);
  }

  public getActivityById(id: number) {
    if (id) {
      return this.httpClient.get<SimpleActivity>(`${this.apiURL}/administration/activities/${id}`);
    }
  }

  public createActivity(activity: Activities) {
    return this.httpClient.post(`${this.apiURL}/administration/activities`, activity);
  }


  public updateActivity(activity: Activities, id) {
    return this.httpClient.patch(`${this.apiURL}/administration/activities/${id}`, activity)
  }

  public deleteActivity(id: number) {
    return this.httpClient.delete(`${this.apiURL}/administration/activities/${id}`);
  }

  /* ------------------------------ DEPARTEMENTS ------------------------------ */

  public getDepartementById(id: number) {
    if (id) {
      return this.httpClient.get<SimpleDepartement>(`${this.apiURL}/administration/departements/${id}`);
    }
  }

  public getDepartements(url?: string) {
    return this.httpClient.get<Departements>(`${this.apiURL}/administration/departements`);
  }

  public createEvent(event){
    return this.httpClient.post(`${this.apiURL}/home`,event, {observe: 'response'});
  }

  public createDepartement(departement) {
    return this.httpClient.post(`${this.apiURL}/administration/departements`, departement);
  }

  public updateDepartement(departement, id) {
    return this.httpClient.patch(`${this.apiURL}/administration/departements/${id}`, departement)
  }

  public deleteDepartement(id: number) {
    return this.httpClient.delete(`${this.apiURL}/administration/departements/${id}`);
  }


  /* ---------------------------------- USERS --------------------------------- */

  public getUserById(id: number) {
    return this.httpClient.get<SimpleUser>(`${this.apiURL}/administration/users/${id}`);
  }

  public getUsers(url?: string) {
    return this.httpClient.get<Users>(`${this.apiURL}/profil`);
  }

  public createUser(user: Users) {
    return this.httpClient.post(`${this.apiURL}/administration/users`, user);
  }

  public updateUser(user: Users, id) {
    return this.httpClient.patch(`${this.apiURL}/administration/users/${id}`, user)
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(`${this.apiURL}/administration/users/${id}`);
  }

}