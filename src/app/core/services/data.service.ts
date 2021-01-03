import { Tasks } from './../../models/tasks';
import { Task } from './../../models/task';
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
  constructor(private httpClient: HttpClient, private auth: AuthenticationService) {
  }
  public apiURL = "http://localhost:8080";

  /* --------------------------------- OTHERS --------------------------------- */
  public profile() {
    return this.httpClient.get(`${this.apiURL}/profile`, {
      headers: { Authorization: `Bearer ${this.auth.getToken()}` },
    });
  }

  public postProfile(profil) {
    return this.httpClient.patch(`${this.apiURL}/profile`, profil, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });

  }

  public getTypes(url?: string) {
    return this.httpClient.get<Type>(`${this.apiURL}/administration/atypes`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public getColors(url?: string) {
    return this.httpClient.get<Color>(`${this.apiURL}/administration/colours`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public getRoles(url?: string) {
    return this.httpClient.get<Roles>(`${this.apiURL}/administration/roles`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public getHome(url?: string) {
    url = url ? url : "";
    return this.httpClient.get(`${this.apiURL}/home${url}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
  public deleteEvent(id) {
    return this.httpClient.delete(`${this.apiURL}/home/${id}`, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
  public updateEvent(id, event) {
    return this.httpClient.patch(`${this.apiURL}/home/${id}`, event, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }


  public getAdminUsers(url: string) {
    url = url ? url : "";
    return this.httpClient.get<Users>(`${this.apiURL}/administration/users${url}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public getPage(url: string) {

    return this.httpClient.get<Users>(`${this.apiURL + url}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

/* ---------------------------------- Tasks --------------------------------- */


  public getTasks(url?: string) {
    return this.httpClient.get<Tasks>(`${this.apiURL}/administration/tasks`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
  public createTask(tasks: Task) {
    return this.httpClient.post(`${this.apiURL}/administration/tasks`, tasks, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
  public updateTask(tasks: Task, id) {
    return this.httpClient.patch(`${this.apiURL}/administration/tasks/${id}`, tasks, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
  public deleteTask(id: number) {
    return this.httpClient.delete(`${this.apiURL}/administration/tasks/${id}`, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

/* -------------------------------- ACTIVITY -------------------------------- */


  public getActivities(url?: string) {
    return this.httpClient.get<Activities>(`${this.apiURL}/administration/activities`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public getActivityById(id: number) {
    if (id) {
      return this.httpClient.get<SimpleActivity>(`${this.apiURL}/administration/activities/${id}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
    }
  }

  public createActivity(activity: Activities) {
    return this.httpClient.post(`${this.apiURL}/administration/activities`, activity, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }


  public updateActivity(activity: Activities, id) {
    return this.httpClient.patch(`${this.apiURL}/administration/activities/${id}`, activity, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public deleteActivity(id: number) {
    return this.httpClient.delete(`${this.apiURL}/administration/activities/${id}`, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  /* ------------------------------ DEPARTEMENTS ------------------------------ */

  public getDepartementById(id: number) {
    if (id) {
      return this.httpClient.get<SimpleDepartement>(`${this.apiURL}/administration/departments/${id}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
    }
  }

  public getDepartements(url?: string) {
    return this.httpClient.get<Departements>(`${this.apiURL}/administration/departments`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public createEvent(event) {
    return this.httpClient.post(`${this.apiURL}/home`, event, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public createDepartement(departement) {
    return this.httpClient.post(`${this.apiURL}/administration/departments`, departement, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public updateDepartement(departement, id) {
    return this.httpClient.patch(`${this.apiURL}/administration/departments/${id}`, departement, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public deleteDepartement(id: number) {
    return this.httpClient.delete(`${this.apiURL}/administration/departments/${id}`, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }


  /* ---------------------------------- USERS --------------------------------- */

  public getUserById(id: number) {
    return this.httpClient.get<SimpleUser>(`${this.apiURL}/administration/users/${id}`, {headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public getUsers(url?: string) {
    return this.httpClient.get<Users>(`${this.apiURL}/profil`);
  }

  public createUser(user: Users) {
    return this.httpClient.post(`${this.apiURL}/administration/users`, user, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public updateUser(user: Users, id) {
    return this.httpClient.patch(`${this.apiURL}/administration/users/${id}`, user, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(`${this.apiURL}/administration/users/${id}`, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }

  public addUserActivity(res) {
    return this.httpClient.post(`${this.apiURL}/administration/activitiesassignments/2`, res, { observe: 'response', headers: { Authorization: `Bearer ${this.auth.getToken()}` } });
  }
}