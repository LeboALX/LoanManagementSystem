import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanService } from 'src/app/loan.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  allUsers: any[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
  initialAmount!: number
  interestRate!: number
  monthlyRepayments!: number
  remainingBalance!: number;
  paymentForm: FormGroup
  loanService: any;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private loan: LoanService) {
    this.calculateRemainingBalance();
    this.paymentForm = new FormGroup({
      amount: new FormControl(''),
      monthlyRepayment: new FormControl('', [Validators.required]),
      interest: new FormControl(''),
      balance: new FormControl('', [Validators.required])
    })
  }

  calculateRemainingBalance() {
    // const initialAmount = 80000;
    // const monthlyRepayment = 3000;
    // const interestRate = 10.5;
    // const months = 12; 
    // this.remainingBalance = this.loanService.calculateLoanBalance(initialAmount, monthlyRepayment, interestRate, months);
  }
}
