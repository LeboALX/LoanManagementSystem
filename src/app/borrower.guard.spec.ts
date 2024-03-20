import { TestBed } from '@angular/core/testing';

import { BorrowerGuard } from './borrower.guard';

describe('BorrowerGuard', () => {
  let guard: BorrowerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BorrowerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
