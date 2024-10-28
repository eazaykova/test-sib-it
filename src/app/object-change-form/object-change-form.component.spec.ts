import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectChangeFormComponent } from './object-change-form.component';

describe('ObjectChangeFormComponent', () => {
  let component: ObjectChangeFormComponent;
  let fixture: ComponentFixture<ObjectChangeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectChangeFormComponent]
    });
    fixture = TestBed.createComponent(ObjectChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
