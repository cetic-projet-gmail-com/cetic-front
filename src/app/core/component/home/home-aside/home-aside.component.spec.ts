import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAsideComponent } from './home-aside.component';

describe('HomeAsideComponent', () => {
  let component: HomeAsideComponent;
  let fixture: ComponentFixture<HomeAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
