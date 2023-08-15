import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPlanComponent } from './production-plan.component';

describe('ProductionPlanComponent', () => {
  let component: ProductionPlanComponent;
  let fixture: ComponentFixture<ProductionPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionPlanComponent]
    });
    fixture = TestBed.createComponent(ProductionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
