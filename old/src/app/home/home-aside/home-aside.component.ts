import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-home-aside',
  templateUrl: './home-aside.component.html',
  styleUrls: ['./home-aside.component.scss']
})
export class HomeAsideComponent implements OnInit, AfterViewInit {
  @ViewChild('collapsible') elCollapsible: ElementRef;
  collapsible;
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.collapsible = M.Collapsible.init(this.elCollapsible.nativeElement, {});

  }
  activities = [
    {
      name: "test",
      colour: {
        code: '#f6f6f6',
      },
      tasks: [
        {
          title: "task1"
        },
        {
          title: "task2"
        }
      ]
    },
    {
      name: "test",
      colour: {
        code: '#f6f6f6',
      },
      tasks: [
        {
          title: "task1"
        },
        {
          title: "task2"
        }
      ]
    }
  ];
}
