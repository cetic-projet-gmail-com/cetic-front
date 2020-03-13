import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/auth/authentification.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  faBars = faBars
  faTimes = faTimes

  isHidden = true

  hidden() {
    this.isHidden = !this.isHidden
    console.log(this.isHidden);
  }

  constructor(private auth: AuthenticationService) { }

  fName;
  lName;
  initials;

  ngOnInit() {
    let userDetails = this.auth.getUserDetails()
    this.fName = userDetails.fName;
    this.lName = userDetails.lName;
    this.initials = `${this.fName.charAt(0).toUpperCase()} ${this.lName.charAt(0).toUpperCase()}`;
  }
  logout() {
    this.auth.logout();
  }

}
