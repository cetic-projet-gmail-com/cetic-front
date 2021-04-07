import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAdminService } from 'src/app/core/services/api/api-admin.service';

import User from '../../../core/models/User';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiAdminService) {}
  user!: User;

  state = {
    isLoading: true,
  };

  ngOnInit(): void {
    this.fetchData(this.route.snapshot.params.id);
  }

  fetchData(id: number) {
    this.state.isLoading = false;
    this.api.getUser(id).subscribe((item: any) => {
      this.user = item;
      this.state.isLoading = false;
    });
  }
}