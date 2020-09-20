import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { users } from './users';
import { activities } from './activities';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataServiceService implements InMemoryDbService {
  createDb() {
    
    return {activities, users};
  }
  genId(Activities): number {
    return Activities.length > 0 ? Math.max(...Activities.map(hero => hero.id)) + 1 : 11;
  }
}
