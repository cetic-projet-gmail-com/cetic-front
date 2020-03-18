import { ActivatedRoute, Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { TitleService } from './../../../services/title.service';

import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'update-departement',
  templateUrl: './update-departement.component.html',
  styleUrls: ['./update-departement.component.scss']
})
export class UpdateDepartementComponent implements OnInit {

  faCaretSquareLeft = faCaretSquareLeft



  constructor(private DataService: DataService, private route: ActivatedRoute, private router: Router, private TitleService: TitleService) { }
  id
  users
  depName
  dep
  userArray
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;
  index: number;
  responsible_Id: number
  ngOnInit() {
    // this.id = this.route.snapshot.paramMap.get('id');

    // this.DataService.getDepartementById(this.id).subscribe((res) => {
    //   this.depName = res.data.departement.name
    // })

    // this.DataService.getAdminUsers("?paginate=false").subscribe((res) => {
    //   this.users = res.data.users
    //   this.options = this.users.map(element => element.lastname)

    // });

    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     return this._filter(value)
    //   })

    // );
    this.showData()
  }

  showData() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.DataService.getDepartementById(this.id).subscribe((res) => {
      this.dep = res.department
      this.depName = res.department.name
      this.TitleService.setTitle(res.department.name)
      console.log(res)
    })

    this.DataService.getAdminUsers("?paginate=false").subscribe((res) => {
      this.users = res.users.users
      this.options = this.users.map(element => element.lastName)
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return this._filter(value)
      })

    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    this.index = this.options.indexOf(value)
    if (this.index != -1) {
      this.responsible_Id = this.users[this.index].id
    }
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }



  onFormSubmit(departementForm: NgForm) {
    
    departementForm.value.responsibleId = this.responsible_Id
    this.DataService.updateDepartement(departementForm, this.id).subscribe((res) => {
      console.log(res)
      console.log("departement updated");


    })
    setTimeout(() => {
      this.router.navigate(['administration/departement'])

    }, 2700);


  }



}
