import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TitleService } from 'src/app/services/title.service';
import { AuthService } from 'src/app/services/auth.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import * as M from "materialize-css/dist/js/materialize";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdown') elDropdown : ElementRef;
 
  constructor(
    private titleService: TitleService,
    private auth: AuthService,
    public router: Router
  ) { }
  dropdown;

  title;
  role
  faBars = faBars;
  faUser = faUser;
  faTimes = faTimes;
  fName;
  lName;
  initials;
  ngOnInit(): void {
    let userDetails = this.auth.getUserDetails();
    this.role = userDetails.roleId;
    this.fName = userDetails.firstName;
    this.lName = userDetails.lastName;
    this.initials = `${this.fName.charAt(0).toUpperCase()} ${this.lName.charAt(0).toUpperCase()}`;
  

  }
  ngAfterViewInit(): void {
    this.title = this.titleService.getTitle();
    this.dropdown = new M.Dropdown(this.elDropdown.nativeElement, {coverTrigger: true, constrainWidth: false});

  }

  logout() {
    this.auth.logout();
  }

}
