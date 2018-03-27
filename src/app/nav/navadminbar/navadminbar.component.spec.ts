import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavadminbarComponent } from './navadminbar.component';

describe('NavadminbarComponent', () => {
  let component: NavadminbarComponent;
  let fixture: ComponentFixture<NavadminbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavadminbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavadminbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
