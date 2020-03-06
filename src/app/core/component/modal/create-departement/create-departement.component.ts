import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'create-departement',
  templateUrl: './create-departement.component.html',
  styleUrls: ['./create-departement.component.scss']
})
export class CreateDepartementComponent implements OnInit {

  constructor(private DataService: DataService) { }
  users
  userArray
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  @Input() isHidden;
  @Output() reset = new EventEmitter()

  ngOnInit() {
    this.DataService.getAdminUsers("?nbre=100000").subscribe((res) => {
      this.users = res.data.users
      this.options = this.users.map(element => element.firstname)
      console.log(this.options);


    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  hide() {
    this.isHidden = !this.isHidden
    this.reset.emit()

  }


}
