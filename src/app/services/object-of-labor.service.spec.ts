import { TestBed } from '@angular/core/testing';

import { ObjectOfLaborService } from './object-of-labor.service';

describe('ObjectOfLaborService', () => {
  let service: ObjectOfLaborService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectOfLaborService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
