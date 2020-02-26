import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private DataService: DataService) { }

  login : string
  firstname : string
  lastname : string
  mail : string
  ngOnInit() {
    this.DataService.getUsers().subscribe((res) => {
      console.log(res);
    });
  }
}