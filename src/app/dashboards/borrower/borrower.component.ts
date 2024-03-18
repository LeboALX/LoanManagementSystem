import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { PaymentComponent } from 'src/app/popUps/payment/payment.component';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.scss'], 
})
export class BorrowerComponent {

  constructor(private dialog: MatDialog) { }

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
