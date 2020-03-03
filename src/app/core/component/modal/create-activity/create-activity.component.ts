import { NgForm } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  constructor(private DataService: DataService) { }
  colors
  types
  ngOnInit() {
    this.DataService.getTypes().subscribe((res) => {
      this.types = res.data
      console.log(this.types)

    });

    this.DataService.getColors().subscribe((res) => {
      this.colors = res.data
      console.log(this.colors)

    });
  }
  onFormSubmit(activityForm: NgForm) {
    this.DataService.createActivity(activityForm.value).subscribe((res)=>{
      console.log(res)
    console.log("activity created");
    })
  }

}
