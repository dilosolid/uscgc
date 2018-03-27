import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavquestionsmobileComponent } from './navquestionsmobile.component';

describe('NavquestionsmobileComponent', () => {
  let component: NavquestionsmobileComponent;
  let fixture: ComponentFixture<NavquestionsmobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavquestionsmobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavquestionsmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
