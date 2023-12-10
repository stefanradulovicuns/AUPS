import { TestBed } from '@angular/core/testing';

import { ObjectOfLaborMaterialService } from './object-of-labor-material.service';

describe('ObjectOfLaborMaterialService', () => {
  let service: ObjectOfLaborMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectOfLaborMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
