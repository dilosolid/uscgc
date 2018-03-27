import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipinfoComponent } from './membershipinfo.component';

describe('MembershipinfoComponent', () => {
  let component: MembershipinfoComponent;
  let fixture: ComponentFixture<MembershipinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
