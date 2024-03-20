import { TestBed } from '@angular/core/testing';

import { BorrowersGuard } from './borrowers.guard';

describe('BorrowersGuard', () => {
  let guard: BorrowersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BorrowersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
