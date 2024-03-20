import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanService } from 'src/app/loan.service';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  allUsers: any[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
  paymentForm: FormGroup
  currentUser : any;
  loanAmount:any;
  balance:any;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog, private loan: LoanService,
               private matdialogRef: MatDialogRef<PaymentComponent>, private api:ApiService,private sharedService: SharedService) {
    
    this.paymentForm = new FormGroup({
      amount: new FormControl(''),
      monthlyRepayment: new FormControl('', [Validators.required]),
      // balance: new FormControl('', [Validators.required]),
    })
  }

  submit(): void {
    const loggedUser =  this.loan.get('currentUser','session')
    console.log("Logged User",loggedUser.email)
    this.api.genericGet('/get-loans')
    .subscribe({
      next: (res: any) => {
        this.sharedService.refreshBalance()
        const user = res.filter((user:any)=> user.email == loggedUser.email)
        if(user){
          this.loanAmount =user[0].loanAmount;
          this.balance = this.loanAmount - this.paymentForm.get('monthlyRepayment')?.value;
          this.balance = this.balance;

          console.log("balance ",this.balance)
          } 
      },
      error: (err: any) => console.log('Error', err),
      complete: () => { }
    });
  }

  close(): void {
    this.matdialogRef.close()
  }
}
