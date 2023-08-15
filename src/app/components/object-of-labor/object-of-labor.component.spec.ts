import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectOfLaborComponent } from './object-of-labor.component';

describe('ObjectOfLaborComponent', () => {
  let component: ObjectOfLaborComponent;
  let fixture: ComponentFixture<ObjectOfLaborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectOfLaborComponent]
    });
    fixture = TestBed.createComponent(ObjectOfLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
