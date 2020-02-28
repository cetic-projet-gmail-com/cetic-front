import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-activity',
  templateUrl: './editactivity.component.html',
  styleUrls: ['./editactivity.component.scss']
})
export class EditActivityComponent implements OnInit {

  faFileExport = faFileExport
  tab;

  constructor(private DataService: DataService, private TitleService: TitleService, public router: Router) { }
  act
  ngOnInit() {
    this.DataService.getActivities().subscribe((res) => {
      this.act = res.data.activities
      console.log(this.act);
      console.log(this.act[0].name);
    });
    // this.TitleService.setTitle(this.act[0].name)
  }
  setRoute(tab: String) {
    this.tab = tab;
  }

}