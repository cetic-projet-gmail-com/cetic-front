import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-user-activity',
  templateUrl: './add-user-activity.component.html',
  styleUrls: ['./add-user-activity.component.scss']
})
export class AddUserActivityComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddUserActivityComponent>, private DataService: DataService) { }
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  users;
  options = [];
  index : number;
  responsible_Id: number

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
  }

  close() {
    this.dialogRef.close();
  }

  onFormSubmit(u) {
    

    this.dialogRef.close(this.responsible_Id);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.index = this.options.indexOf(value)
    if (this.index != -1){
      this.responsible_Id = this.users[this.index].id
    }
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
