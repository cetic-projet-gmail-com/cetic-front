import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  constructor(private DataService : DataService) { }

  ngOnInit() {

  }
onFormSubmit(taskForm: NgForm) {
    this.DataService.createTask(taskForm.value).subscribe((res) => {
      console.log("task created");
      
    })
  }
}
