import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
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

  id
  constructor(private DataService: DataService, private route: ActivatedRoute) { }
  colors
  types
  actDesc
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.DataService.getActivityById(this.id).subscribe((res)=>{
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
    this.DataService.updateActivity(activityForm.value, this.id).subscribe((res)=>{
      
      console.log(res)
    console.log("activity updated");
    })
  }

}

