import { ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'update-departement',
  templateUrl: './update-departement.component.html',
  styleUrls: ['./update-departement.component.scss']
})
export class UpdateDepartementComponent implements OnInit {

  constructor(private DataService: DataService, private route: ActivatedRoute) { }
  id
  users 
  depName
  userArray
  myControl = new FormControl();
  options= [];
  filteredOptions: Observable<string[]>;
  index : number;
  responsible_Id: number
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

this.DataService.getDepartementById(this.id).subscribe((res)=> {
  this.depName = res.data.departement.name
})

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

  

  onFormSubmit(departementForm: NgForm) {
    let infos = {
          name: departementForm.value.name,
          responsable_id:this.responsible_Id
    }
    this.DataService.updateDepartement(infos, this.id).subscribe((res) => {
      console.log(res)
      console.log("departement created");
    })
  }

}