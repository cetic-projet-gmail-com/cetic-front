
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
  options= [];
  filteredOptions: Observable<string[]>;

  @Input() isHidden;
  @Output() reset = new EventEmitter()

  index : number;
  responsible_Id: number
  ngOnInit() {
    this.DataService.getAdminUsers("?paginate=false").subscribe((res) => {
      this.users = res.data.users
      this.options = this.users.map(element => element.lastname)
      
    });
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
      return this._filter(value)})

    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.index = this.options.indexOf(value)
    if (this.index != -1){
      this.responsible_Id = this.users[this.index].id
    }
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  hide() {
    this.isHidden = !this.isHidden
    this.reset.emit()

  }


  

  onFormSubmit(departementForm: NgForm) {
    let infos = {
          name: departementForm.value.name,
          responsable_id:this.responsible_Id
        
      
    }
    this.DataService.createDepartement(infos).subscribe((res) => {
      
      console.log("departement created");
    })
  }

}
