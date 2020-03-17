import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss']
})
export class UpdateActivityComponent implements OnInit {
  actName
  actResp
  actType
  actColor
  users
  userArray
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;
  index: number;
  responsible_Id: number

  id
  constructor(private DataService: DataService, private route: ActivatedRoute, private router: Router) { }
  colors
  types
  actDesc
  ngOnInit() {
    this.DataService.getAdminUsers("?paginate=false").subscribe((res) => {
      this.users = res.data.users
      this.options = this.users.map(element => element.lastname)

    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value)
      })

    );

    this.id = this.route.snapshot.paramMap.get('id');

    this.DataService.getActivityById(this.id).subscribe((res) => {
      this.actName = res.data.activity.name
      this.actDesc = res.data.activity.description
      this.actResp = res.data.activity.projectManager
      this.actType = res.data.activity.a_type_id
      this.actColor = res.data.activity.color_code

    })
    this.DataService.getTypes().subscribe((res) => {
      this.types = res.data

    });

    this.DataService.getColors().subscribe((res) => {
      this.colors = res.data

    });
  }
  onFormSubmit(activityForm: NgForm) {
    activityForm.value.projectManager = this.responsible_Id
    this.DataService.updateActivity(activityForm.value, this.id).subscribe((res) => {

      console.log(res)
      console.log("activity updated");
    })

    setTimeout(() => {
      this.router.navigate(['administration/departement'])

    }, 2700);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.index = this.options.indexOf(value)
    if (this.index != -1) {
      this.responsible_Id = this.users[this.index].id
    }
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}

