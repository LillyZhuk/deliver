import { TestBed } from '@angular/core/testing';

import { BgChangeService } from './bg-change.service';

describe('BgChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BgChangeService = TestBed.get(BgChangeService);
    expect(service).toBeTruthy();
  });
});
