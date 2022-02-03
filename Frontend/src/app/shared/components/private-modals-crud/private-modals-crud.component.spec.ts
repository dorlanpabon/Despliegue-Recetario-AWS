import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateModalsCrudComponent } from './private-modals-crud.component';

describe('PrivateModalsCrudComponent', () => {
  let component: PrivateModalsCrudComponent;
  let fixture: ComponentFixture<PrivateModalsCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateModalsCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateModalsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
