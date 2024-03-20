import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  loanAmount: any;
  balance: any;

  constructor(private dialog: MatDialog, private api: ApiService, private shared: LoanService,
    private sharedService: SharedService,) {
    const loggedUser = this.shared.get('currentUser', 'session')
    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          const user = res.filter((user: any) => user.email == loggedUser.email)
          if (user) {
            this.loanAmount = user[0].loanAmount;
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
          let data = res.data;
          const loggedUser = this.shared.get('currentUser', 'session')
          this.sharedService.watchBalanceUpdates().subscribe(() => {
            this.api.genericGet('/get-loans')
              .subscribe({
                next: (res: any) => {
                  let minusAmount = data;
                  const user = res.filter((user: any) => user.email == loggedUser.email)
                  if (user) {
                    this.loanAmount = user[0].loanAmount;
                    this.balance = this.loanAmount - minusAmount;
                    this.balance = this.balance;
                  }
                },
                error: (err: any) => console.log('Error', err),
                complete: () => { }
              });
          })
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
