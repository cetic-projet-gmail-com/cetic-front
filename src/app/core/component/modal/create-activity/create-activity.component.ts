import { NgForm } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from '../../../services/title.service';

@Component({
  selector: 'create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit {

  faCaretSquareLeft = faCaretSquareLeft

  @Input() isHidden;
  @Output() reset = new EventEmitter()

  constructor(private DataService: DataService, private TitleService: TitleService) { }
  colors
  types
  ngOnInit() {
    this.DataService.getTypes().subscribe((res) => {
      this.types = res.data
      console.log(this.types)

    });
    this.TitleService.setTitle("Nouvelle activité")

    this.DataService.getColors().subscribe((res) => {
      this.colors = res.data
      console.log(this.colors)

    });
  }
  onFormSubmit(activityForm: NgForm) {
    this.DataService.createActivity(activityForm.value).subscribe((res) => {
      console.log(res)
      console.log("activity created");
      this.hide()
    })
  }

  hide() {
    this.isHidden = !this.isHidden
    this.reset.emit()
  }

}
