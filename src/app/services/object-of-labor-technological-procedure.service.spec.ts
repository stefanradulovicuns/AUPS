import { TestBed } from '@angular/core/testing';

import { ObjectOfLaborTechnologicalProcedureService } from './object-of-labor-technological-procedure.service';

describe('ObjectOfLaborTechnologicalProcedureService', () => {
  let service: ObjectOfLaborTechnologicalProcedureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectOfLaborTechnologicalProcedureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
