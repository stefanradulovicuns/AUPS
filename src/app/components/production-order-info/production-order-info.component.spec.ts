import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOrderInfoComponent } from './production-order-info.component';

describe('ProductionOrderInfoComponent', () => {
  let component: ProductionOrderInfoComponent;
  let fixture: ComponentFixture<ProductionOrderInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionOrderInfoComponent]
    });
    fixture = TestBed.createComponent(ProductionOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
