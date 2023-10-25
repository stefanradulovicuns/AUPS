import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectOfLaborInfoComponent } from './object-of-labor-info.component';

describe('ObjectOfLaborInfoComponent', () => {
  let component: ObjectOfLaborInfoComponent;
  let fixture: ComponentFixture<ObjectOfLaborInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectOfLaborInfoComponent]
    });
    fixture = TestBed.createComponent(ObjectOfLaborInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
