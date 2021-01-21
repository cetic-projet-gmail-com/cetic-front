import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAdminService } from 'src/app/core/services/api/api-admin.service';

import Activity from 'src/app/core/models/Activity';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiAdminService) {}

  activity!: Activity;

  state = {
    isLoading: true,
  };

  ngOnInit(): void {
    this.fetchData(this.route.snapshot.params.id);
  }

  fetchData(id: number) {
    this.state.isLoading = false;
    this.api.getActivity(id).subscribe((item: any) => {
      this.activity = item;
      this.state.isLoading = false;
    });
  }
}
