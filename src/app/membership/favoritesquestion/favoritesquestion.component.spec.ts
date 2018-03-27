import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesquestionComponent } from './favoritesquestion.component';

describe('FavoritesquestionComponent', () => {
  let component: FavoritesquestionComponent;
  let fixture: ComponentFixture<FavoritesquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
