import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistedquestionComponent } from './blacklistedquestion.component';

describe('BlacklistedquestionComponent', () => {
  let component: BlacklistedquestionComponent;
  let fixture: ComponentFixture<BlacklistedquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistedquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistedquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
