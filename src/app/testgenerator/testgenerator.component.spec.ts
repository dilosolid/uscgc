import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestgeneratorComponent } from './testgenerator.component';

describe('TestgeneratorComponent', () => {
  let component: TestgeneratorComponent;
  let fixture: ComponentFixture<TestgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
