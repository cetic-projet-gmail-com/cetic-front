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


  constructor() { }

  ngOnInit() {
  }

}
