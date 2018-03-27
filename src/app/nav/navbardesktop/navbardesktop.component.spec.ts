import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbardesktopComponent } from './navbardesktop.component';

describe('NavbardesktopComponent', () => {
  let component: NavbardesktopComponent;
  let fixture: ComponentFixture<NavbardesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbardesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbardesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
