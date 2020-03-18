import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
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
  users
  userArray
  myControl = new FormControl();
  options= [];
  filteredOptions: Observable<string[]>;
  index : number;
  responsible_Id: number
  types
  ngOnInit() {
    this.DataService.getAdminUsers("?paginate=false").subscribe((res) => {
      this.users = res.users.users
      this.options = this.users.map(element => element.lastName)
      
    });
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
      return this._filter(value)})

    );

    this.DataService.getTypes().subscribe((res) => {
      this.types = res.aTypes

    });
    this.TitleService.setTitle("Nouvelle activité")

    this.DataService.getColors().subscribe((res) => {
      this.colors = res.data

    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.index = this.options.indexOf(value)
    if (this.index != -1){
      this.responsible_Id = this.users[this.index].id
    }
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  onFormSubmit(activityForm: NgForm) {
    activityForm.value.projectManagerId = this.responsible_Id
    this.DataService.createActivity(activityForm.value).subscribe((res) => {
      console.log("activity created");
      this.hide()
    })
  }

  hide() {
    this.isHidden = !this.isHidden
    this.reset.emit()
  }

}
