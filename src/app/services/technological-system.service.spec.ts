import { TestBed } from '@angular/core/testing';

import { TechnologicalSystemService } from './technological-system.service';

describe('TechnologicalSystemService', () => {
  let service: TechnologicalSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnologicalSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
