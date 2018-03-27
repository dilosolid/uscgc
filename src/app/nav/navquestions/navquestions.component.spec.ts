import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavquestionsComponent } from './navquestions.component';

describe('NavquestionsComponent', () => {
  let component: NavquestionsComponent;
  let fixture: ComponentFixture<NavquestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavquestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
