import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserActivityComponent } from './add-user-activity.component';

describe('AddUserActivityComponent', () => {
  let component: AddUserActivityComponent;
  let fixture: ComponentFixture<AddUserActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
