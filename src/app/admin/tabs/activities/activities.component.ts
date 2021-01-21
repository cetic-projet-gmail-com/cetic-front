import { Component, OnInit } from '@angular/core';
import Activity from 'src/app/core/models/Activity';
import { ApiAdminService } from 'src/app/core/services/api/api-admin.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  public activities!: Activity[];

  constructor(private api: ApiAdminService) {}
  displayedColumns: string[] = ['name', 'description', 'ended'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.api.getActivities().subscribe(
      (activities: any) => {
        this.activities = activities.data;
      },
      (error) => {}
    );
  }
}
