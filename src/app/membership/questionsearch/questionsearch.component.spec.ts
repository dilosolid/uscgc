import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsearchComponent } from './questionsearch.component';

describe('QuestionsearchComponent', () => {
  let component: QuestionsearchComponent;
  let fixture: ComponentFixture<QuestionsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
