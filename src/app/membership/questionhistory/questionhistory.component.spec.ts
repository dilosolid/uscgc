import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionhistoryComponent } from './questionhistory.component';

describe('QuestionhistoryComponent', () => {
  let component: QuestionhistoryComponent;
  let fixture: ComponentFixture<QuestionhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
