import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectOfLaborTechnologicalProcedureComponent } from './object-of-labor-technological-procedure.component';

describe('ObjectOfLaborTechnologicalProcedureComponent', () => {
  let component: ObjectOfLaborTechnologicalProcedureComponent;
  let fixture: ComponentFixture<ObjectOfLaborTechnologicalProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectOfLaborTechnologicalProcedureComponent]
    });
    fixture = TestBed.createComponent(ObjectOfLaborTechnologicalProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
