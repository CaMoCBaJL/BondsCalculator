import { TestBed } from '@angular/core/testing';

import { BondsEnumsService } from './bonds-enums.service';

describe('BondsEnumsService', () => {
  let service: BondsEnumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondsEnumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
