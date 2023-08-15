import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologicalProcedureComponent } from './technological-procedure.component';

describe('TechnologicalProcedureComponent', () => {
  let component: TechnologicalProcedureComponent;
  let fixture: ComponentFixture<TechnologicalProcedureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnologicalProcedureComponent]
    });
    fixture = TestBed.createComponent(TechnologicalProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
