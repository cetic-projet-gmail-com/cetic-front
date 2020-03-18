import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  faCaretSquareLeft = faCaretSquareLeft
  faFileExport = faFileExport
  id

  constructor(private DataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.DataService.getUserById(this.id).subscribe((res)=> {
      console.log(res)
    })
  }

}
