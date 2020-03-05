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

  id
  constructor(private DataService: DataService, private route: ActivatedRoute) { }
  colors
  types
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.DataService.getTypes().subscribe((res) => {
      this.types = res.data

    });

    this.DataService.getColors().subscribe((res) => {
      this.colors = res.data

    });
  }
  onFormSubmit(activityForm: NgForm) {
    console.log(activityForm.value)
    this.DataService.updateActivity(activityForm.value, this.id).subscribe((res)=>{
      
      console.log(res)
    console.log("activity updated");
    })
  }

}
