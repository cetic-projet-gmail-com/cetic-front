import { Component, OnInit } from '@angular/core';
import { ApiAdminService } from 'src/app/core/services/api/api-admin.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  constructor(private api: ApiAdminService) {}
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  activities = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.api.getActivities().subscribe((activities) => {
      this.activities = activities.data;
    });
  }
}
