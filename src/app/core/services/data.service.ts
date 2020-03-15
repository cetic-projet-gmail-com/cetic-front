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
import { AuthenticationService } from './auth/authentification.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiURL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, private auth: AuthenticationService) {
  }

/* --------------------------------- OTHERS --------------------------------- */
  public profile() {
    return this.httpClient.get(`${this.apiURL}/profile`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });

  }

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
    return this.httpClient.get(`${this.apiURL}/home${url}`);
  }
  public deleteEvent(id) {
    return this.httpClient.delete(`${this.apiURL}/home/${id}`, {observe: 'response'});
  }
  public updateEvent(id, event) {
    return this.httpClient.patch(`${this.apiURL}/home/${id}`, event, {observe: 'response'});
  }

  
  public getAdminUsers( url:string ) {
    url = url? url: "";
    return this.httpClient.get<Users>(`${this.apiURL}/administration/users${url}`);
  }

  public getPage(url:string) {

    return this.httpClient.get<Users>(`${this.apiURL+url}`);
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
      return this.httpClient.get<SimpleDepartement>(`${this.apiURL}/administration/departments/${id}`);
    }
  }

  public getDepartements(url?: string) {
    return this.httpClient.get<Departements>(`${this.apiURL}/administration/departments`);
  }

  public createEvent(event){
    return this.httpClient.post(`${this.apiURL}/home`,event, {observe: 'response'});
  }

  public createDepartement(departement) {
    return this.httpClient.post(`${this.apiURL}/administration/departments`, departement);
  }

  public updateDepartement(departement, id) {
    return this.httpClient.patch(`${this.apiURL}/administration/departments/${id}`, departement)
  }

  public deleteDepartement(id: number) {
    return this.httpClient.delete(`${this.apiURL}/administration/departments/${id}`);
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