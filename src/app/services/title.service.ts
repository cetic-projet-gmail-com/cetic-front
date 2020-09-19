import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  // title = "CETIC - Administration";
  constructor() {
    //Je set un titre par défaut
    // this.title = "CETIC - Administration";
  }
  title;
  public setTitle(title: string) {
    //Méthode set

    this.title = title;

  }

  public getTitle() {
    //Méthode get
    return this.title;
  }
}