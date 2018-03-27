import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Login3rdpartyComponent } from './login3rdparty.component';

describe('Login3rdpartyComponent', () => {
  let component: Login3rdpartyComponent;
  let fixture: ComponentFixture<Login3rdpartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login3rdpartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login3rdpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
