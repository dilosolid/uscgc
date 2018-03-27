import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarmobileComponent } from './navbarmobile.component';

describe('NavbarmobileComponent', () => {
  let component: NavbarmobileComponent;
  let fixture: ComponentFixture<NavbarmobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarmobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
