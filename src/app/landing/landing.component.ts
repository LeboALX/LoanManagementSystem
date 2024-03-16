import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnquireComponent } from '../enquire/enquire.component';
import { RegisterComponent } from '../components/register/register.component';

export interface LoanDetails {
  monthlyInstallment: number;
  totalInterest: number;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  loans:any[]=['Loan overview','About Us','Contacts']
  calculatorFormData: any = {}
  emi:Number = 0;
  interestPayable:Number = 0;
  totalAmount:Number = 0;

  constructor(private dialog: MatDialog, private elementRef: ElementRef ){}

  calculateLoanInterest(principal: number, annualInterestRate: number, loanTenureInMonths: number): LoanDetails {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalPayments = loanTenureInMonths;
    const compoundFactor = Math.pow(1 + monthlyInterestRate, totalPayments);
    const monthlyPayment = (principal * monthlyInterestRate * compoundFactor) / (compoundFactor - 1);
    const totalInterest = (monthlyPayment * totalPayments) - principal;
    return { monthlyInstallment: monthlyPayment, totalInterest: totalInterest };
}

  submit():void{
    const loanDetails = this.calculateLoanInterest(this.calculatorFormData.loanAmount, this.calculatorFormData.interest, this.calculatorFormData.loanTenure);
    this.emi = Number(loanDetails.monthlyInstallment.toFixed(2))
    this.interestPayable = Number(loanDetails.totalInterest.toFixed(2))
    this.totalAmount = Number(this.calculatorFormData.loanAmount) + Number(loanDetails.totalInterest.toFixed(2))
  }

  scrollToSection(indx:any) {
    const targetSection = this.elementRef.nativeElement.querySelector('#targetSection');
    const aboutUs = this.elementRef.nativeElement.querySelector('#aboutUs');
    const footer = this.elementRef.nativeElement.querySelector('#footer');
    if(indx == 0)
    {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    else if(indx == 1)
    {
      aboutUs.scrollIntoView({ behavior: 'smooth' });
    }
    else if(indx == 2)
    {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
    else{
      return
    }
  }

  openDialog():void{
    this.dialog.open(EnquireComponent,{
      width:"50%"
    })
  }

  apply():void{
    this.dialog.open(RegisterComponent,{
      height:"100%",
    })
  }
}
