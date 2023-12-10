import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectOfLaborMaterialComponent } from './object-of-labor-material.component';

describe('ObjectOfLaborMaterialComponent', () => {
  let component: ObjectOfLaborMaterialComponent;
  let fixture: ComponentFixture<ObjectOfLaborMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectOfLaborMaterialComponent]
    });
    fixture = TestBed.createComponent(ObjectOfLaborMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
