import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPolicyComponent } from './loan-policy.component';

describe('LoanPolicyComponent', () => {
  let component: LoanPolicyComponent;
  let fixture: ComponentFixture<LoanPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
