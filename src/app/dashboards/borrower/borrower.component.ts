import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoanService } from 'src/app/loan.service';
import { PaymentComponent } from 'src/app/popUps/payment/payment.component';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.scss'],
})
export class BorrowerComponent {
  allLoans: any = [];
  currentUser: any;
  myLoanDetails: any;
  loanAmount: any = 0;
  remainingBalance: any = 0;
  

  constructor(private dialog: MatDialog, private api: ApiService, private shared: LoanService,
    private snackbar: MatSnackBar, private loan: LoanService, private refresh: SharedService) {
    const loggedUser = this.shared.get('currentUser', 'session')
    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          this.refresh.refreshBalance()
          const user = res.filter((user: any) => user.email === loggedUser.email)
          if (user) {
            this.loanAmount = user[0].loanAmount;
            this.remainingBalance = user[0].balance
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });

    this.refreshBorrowerPage()
  }

  refreshBorrowerPage(): void {
    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          const loggedUser = this.shared.get('currentUser', 'session')
          const user = res.filter((user: any) => user.email === loggedUser.email)
          if (user) {
            this.loanAmount = user[0].loanAmount;
            this.remainingBalance = user[0].balance
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }


  makePayment(): void {
    let _data = this.dialog.open(PaymentComponent, {
      width: '40%'
    })
    _data.afterClosed()
      .subscribe({
        next: (res: any) => {
          const inputValue = res.data;
          const loggedUser = this.loan.get('currentUser', 'session')
          this.api.genericGet('/get-loans')
            .subscribe({
              next: (res: any) => {
                const user = res.filter((user: any) => user.email == loggedUser.email)
                if (user) {
                  const _id = user[0]._id;
                  let newBalance = user[0].balance - inputValue;
                  newBalance = newBalance;
                  if(user[0].balance == 0)
                  {
                    this.snackbar.open("balance settled!",'Ok',{duration:3000});
                    return
                  }
                  this.api.updateBalance(`/update-loan/${_id}`, { balance: newBalance })
                    .subscribe({
                      next: (res: any) => {
                        console.log("update response:", res)
                        if (res.modifiedCount == 1) {
                          this.snackbar.open("Payment Successful!", "Ok", { duration: 3000 })
                          this.refresh.refreshBalance()
                          this.refreshBorrowerPage()
                        }
                        else {
                          this.snackbar.open("Failed!!", "Ok", { duration: 3000 })
                        }
                      },
                      error: (err: any) => console.log('Error', err),
                      complete: () => { }
                    });
                }
              },
              error: (err: any) => console.log('Error', err),
              complete: () => { }
            });
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      })

  }

  afterClose(): void {

  }

  apply(): void {
    this.dialog.open(RegisterComponent, {
      height: "100%"
    })
  }
}
