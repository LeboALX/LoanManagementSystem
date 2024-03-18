import { Component } from '@angular/core';
import { LoanService } from 'src/app/loan.service';

@Component({
  selector: 'app-loan-officer',
  templateUrl: './loan-officer.component.html',
  styleUrls: ['./loan-officer.component.scss']
})
export class LoanOfficerComponent {

  pendingLoans : number = 0;
  approvedLoans : number = 0;
  declinedLoans : number = 0;

  constructor( private shared: LoanService){
      const pending = this.shared.get('borrowers','local');
      if(pending){
        this.pendingLoans = pending.length;
      }
  }

}
