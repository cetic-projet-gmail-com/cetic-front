import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-flat-picker',
  templateUrl: './flat-picker.component.html',
  styleUrls: ['./flat-picker.component.scss'],
})
export class FlatPickerComponent implements OnInit {
  @Input()
  viewDate: Date;

  @Output()
  viewDateChange = new EventEmitter<Date>();

  constructor() {}

  ngOnInit(): void {}
}
