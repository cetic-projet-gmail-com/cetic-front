import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from './../../services/title.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/auth/authentification.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  title;
  role
  faBars = faBars
  faUser = faUser
  constructor(private _router: Router, private TitleService: TitleService, private auth: AuthenticationService) {

  }
  ngOnInit() {
    let { role} = this.auth.getUserDetails();
    this.role = role;
  }
  ngAfterContentInit() {
    // Actuellement on utilise un setTimeout car le service s'initialise avant le component. NEED TO FIX
    setTimeout(() => { this.title = this.TitleService.getTitle(); }, 150)
  }
}
