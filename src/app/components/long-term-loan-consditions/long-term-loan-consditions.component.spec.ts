import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermLoanConsditionsComponent } from './long-term-loan-consditions.component';

describe('LongTermLoanConsditionsComponent', () => {
  let component: LongTermLoanConsditionsComponent;
  let fixture: ComponentFixture<LongTermLoanConsditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongTermLoanConsditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongTermLoanConsditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
