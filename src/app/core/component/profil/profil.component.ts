import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TitleService } from './../../services/title.service';
import { AuthenticationService, UserDetails } from '../../services/auth/authentification.service';


@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private http: HttpClient, private TitleService: TitleService, private auth: AuthenticationService) {

  }
  details: UserDetails;
  user = {};
  role;
  baseUrl = "http://localhost:3000";
  url = this.baseUrl + '/profil';

  ngOnInit() {
    

    // this.getInfos()
    // On initialise le titre pour le service afin de le mettre dans la navbar. A verifier si dans le ngOnInit on peut récupérer les data récupérés via le back afin de construire un titre comme "Activités: Monactiviteeee" 
    this.TitleService.setTitle("Mon joli titre")

    this.auth.profile().subscribe(users => {
      this.user = users.data;
      // console.log(this.details)
    }, (err) => {
      console.error(err);
    });
  }
  /*
  getInfos() {
    this.http.get(this.url).subscribe(element => {
      this.user = element["data"].profil
    })
  }
  */

  isAuthorize(){
    let isAutorize;
    if(this.role === "admin"){
      isAutorize = true;
    } else {
      isAutorize = false;
    }
    
    return !isAutorize;

}
 
}