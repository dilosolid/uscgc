import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionbodyComponent } from './questionbody.component';

describe('QuestionbodyComponent', () => {
  let component: QuestionbodyComponent;
  let fixture: ComponentFixture<QuestionbodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionbodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
