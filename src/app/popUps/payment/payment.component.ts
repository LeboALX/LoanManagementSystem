import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  currentUser: any;
  loanAmount: any;
  balance: any;
  status: boolean = false;

  constructor(private snackBar: MatSnackBar, private loan: LoanService,
    private matdialogRef: MatDialogRef<PaymentComponent>,
    private api: ApiService, private sharedService: SharedService, @Inject(MAT_DIALOG_DATA) public _data: any) {
 
      this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          this.sharedService.refreshBalance()
          const loggedUser =  this.loan.get('currentUser','session')
          const user = res.filter((user: any) => user.email == loggedUser.email)
          if (user) {
            this.loanAmount = user[0].loanAmount;
          }
          if(user[0].loanStatutus === 'approved')
          {
            this.status = true;
          }else{
            this.status = false
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
    this.paymentForm = new FormGroup({
      amount: new FormControl(''),
      monthlyRepayment: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required]),
    })

    console.log("Form ya Pay", this.paymentForm.value)
  }

  submit(): void {
    const loggedUser = this.loan.get('currentUser', 'session')
    console.log("Logged User", loggedUser.email)
    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          this.sharedService.refreshBalance()
          const user = res.filter((user: any) => user.email == loggedUser.email)
          if(user)
          {
            const _id = res[0]._id;
            const subMoney = this.paymentForm.get('monthlyRepayment')?.value
            
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
    this.close();
  }

  close(): void {
    this.matdialogRef.close({
      data: this.paymentForm.get('monthlyRepayment')?.value
    })
  }
}
