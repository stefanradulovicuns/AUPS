import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologicalSystemComponent } from './technological-system.component';

describe('TechnologicalSystemComponent', () => {
  let component: TechnologicalSystemComponent;
  let fixture: ComponentFixture<TechnologicalSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnologicalSystemComponent]
    });
    fixture = TestBed.createComponent(TechnologicalSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
