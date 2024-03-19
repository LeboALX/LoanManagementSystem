import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoanService } from 'src/app/loan.service';
import { PaymentComponent } from 'src/app/popUps/payment/payment.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.scss'],
})
export class BorrowerComponent {
  allLoans: any = [];
  currentUser : any;
  myLoanDetails:any;

  constructor(private dialog: MatDialog, private api: ApiService,private shared:LoanService) {
    const loggedUser =  this.shared.get('currentUser','session')
    if(loggedUser){
      this.currentUser = loggedUser
    }

    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          console.log("response", res)
          this.allLoans = res;
          if (this.allLoans) {
            const myLoan = this.allLoans.filter((user:any)=> user.email === this.currentUser.email)
            if(myLoan){
              console.log("myLoans",myLoan)
              this.myLoanDetails = myLoan
            }else{
              console.log("no pending Loans")
            }
            console.log("lol",this.allLoans)
          }
          console.log('what ', this.allLoans)
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });

      console.log("finally",this.myLoanDetails)

  }

  makePayment(): void {
    this.dialog.open(PaymentComponent, {
      width: '40%'
    })
  }

  apply(): void {
    this.dialog.open(RegisterComponent, {
      height: "100%"
    })
  }
}
