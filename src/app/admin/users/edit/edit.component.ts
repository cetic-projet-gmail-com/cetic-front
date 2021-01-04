import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAdminService } from 'src/app/core/services/api/api-admin.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiAdminService) {}
  item = {};

  state = {
    isLoading: true,
  };
  ngOnInit(): void {
    this.fetchData(this.route.snapshot.params.id);
  }

  fetchData(id: number) {
    this.state.isLoading = false;
    this.api.getUser(id).subscribe((item: any) => {
      this.item = item;
      this.state.isLoading = false;
    });
  }
}
