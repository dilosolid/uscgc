import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserscorehistoryComponent } from './userscorehistory.component';

describe('UserscorehistoryComponent', () => {
  let component: UserscorehistoryComponent;
  let fixture: ComponentFixture<UserscorehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserscorehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserscorehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
