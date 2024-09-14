import { TestBed } from '@angular/core/testing';

import { BondsUiKitService } from './bonds-ui-kit.service';

describe('BondsUiKitService', () => {
  let service: BondsUiKitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BondsUiKitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
