import { TestBed } from '@angular/core/testing';

import { BondsEntitiesService } from './bonds-entities.service';

describe('BondsEntitiesService', () => {
  let service: BondsEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondsEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
