import { TestBed } from '@angular/core/testing';

import { LoanOfficerGuard } from './loan-officer.guard';

describe('LoanOfficerGuard', () => {
  let guard: LoanOfficerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoanOfficerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
