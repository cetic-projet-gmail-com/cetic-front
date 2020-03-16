import { DataService } from 'src/app/core/services/data.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TitleService } from './../../services/title.service';
import { AuthenticationService, UserDetails } from '../../services/auth/authentification.service';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  faCaretSquareLeft = faCaretSquareLeft


  constructor(private DataService: DataService, private TitleService: TitleService) {

  }
  // details: UserDetails;
  user = {};
  // role;
  // baseUrl = this.DataService.apiURL;
  // url = this.baseUrl + '/profil';

  ngOnInit() {


    // this.getInfos()
    // On initialise le titre pour le service afin de le mettre dans la navbar. A verifier si dans le ngOnInit on peut récupérer les data récupérés via le back afin de construire un titre comme "Activités: Monactiviteeee" 
    // this.TitleService.setTitle("Ma page profil")

    this.DataService.profile().subscribe(users => {
      this.user = users['data'];
      this.TitleService.setTitle(`${this.user['firstName']}`)

    }, (err) => {
      console.error(err);
    });
  }
  

  // isAuthorize() {
  //   let isAutorize;
  //   if (this.role === "admin") {
  //     isAutorize = true;
  //   } else {
  //     isAutorize = false;
  //   }

  //   return !isAutorize;

  // }

}