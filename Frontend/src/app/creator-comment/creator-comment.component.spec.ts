import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorCommentComponent } from './creator-comment.component';

describe('CreatorCommentComponent', () => {
  let component: CreatorCommentComponent;
  let fixture: ComponentFixture<CreatorCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
