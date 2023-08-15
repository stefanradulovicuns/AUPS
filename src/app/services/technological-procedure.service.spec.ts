import { TestBed } from '@angular/core/testing';

import { TechnologicalProcedureService } from './technological-procedure.service';

describe('TechnologicalProcedureService', () => {
  let service: TechnologicalProcedureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologicalProcedureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
