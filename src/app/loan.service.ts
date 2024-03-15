import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor() { }

  calculateLoanBalance(initialAmount: number, monthlyRepayment: number, interestRate: number, months: number): number {
    let remainingAmount = initialAmount;
    const monthlyInterestRate = interestRate / 12 / 100;
    for (let i = 0; i < months; i++) {
      const interestPayment = remainingAmount * monthlyInterestRate;
      const principalPayment = monthlyRepayment - interestPayment;
      remainingAmount -= principalPayment;
    }
    return remainingAmount;
  }
}
