import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchedContainerComponent } from './movie-searched-container.component';

describe('MovieSearchedContainerComponent', () => {
  let component: MovieSearchedContainerComponent;
  let fixture: ComponentFixture<MovieSearchedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSearchedContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSearchedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
