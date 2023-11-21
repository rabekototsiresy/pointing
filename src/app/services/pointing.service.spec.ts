import { TestBed } from '@angular/core/testing';

import { PointingService } from './pointing.service';

describe('PointingService', () => {
  let service: PointingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
