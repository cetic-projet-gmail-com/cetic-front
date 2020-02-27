import { Component, OnInit } from '@angular/core';
import { TitleService } from './../../services/title.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  constructor(private http: HttpClient, private TitleService: TitleService) { }

  ngOnInit() {
    this.TitleService.setTitle("Mot de passe oublié")
  }



}
