import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private http: HttpClient) { }
  user = {};
  baseUrl = "http://localhost:3000";
  url = this.baseUrl + '/profil';
  ngOnInit() {
    this.getInfos()
  }
  getInfos() {
    this.http.get(this.url).subscribe(element => {
      this.user = element["data"].profil

      console.log(this.user)
    })
  }
}