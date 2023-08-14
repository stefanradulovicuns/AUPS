import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationalUnitComponent } from './organizational-unit.component';

describe('OrganizationalUnitComponent', () => {
  let component: OrganizationalUnitComponent;
  let fixture: ComponentFixture<OrganizationalUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationalUnitComponent]
    });
    fixture = TestBed.createComponent(OrganizationalUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
