import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoanDetails } from 'src/app/landing/landing.component';
import { PaymentComponent } from 'src/app/popUps/payment/payment.component';
import { LoanOfficerComponent } from '../loan-officer/loan-officer.component';
import { LoanService } from 'src/app/loan.service';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.scss'], 
})
export class BorrowerComponent {
  loanD:boolean = false;
  currentUser : any;
  allLoans : any =[];
  loanDetails :any;

  constructor(private dialog: MatDialog ,private shared:LoanService) { 

    this.currentUser = this.shared.get('currentUser','session');
    this.allLoans = this.shared.get("borrowers","local");

    const myDetails = this.allLoans.filter((user :any)=> user.email === this.currentUser.email)
    if(myDetails){
      this.loanDetails = myDetails
    }else{
      true
    }
    



  }

  makePayment(): void {
    this.dialog.open(PaymentComponent, {
      width: '30%'
    })
  }

  apply():void{
    this.dialog.open(RegisterComponent,{
      height:"100%"
    })
  }
}
