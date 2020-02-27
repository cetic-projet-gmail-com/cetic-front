import { Component } from '@angular/core';
import { TitleService } from './../../services/title.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  constructor(private http: HttpClient, private TitleService: TitleService) {

  }

  ngOnInit() {
    this.TitleService.setTitle("Informations")
  }

}