import { AfterViewInit, Component } from '@angular/core';
import { LoanService } from 'src/app/loan.service';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-loan-officer',
  templateUrl: './loan-officer.component.html',
  styleUrls: ['./loan-officer.component.scss']
})
export class LoanOfficerComponent implements AfterViewInit{

  pendingLoans : number = 0;
  approvedLoans : number = 0;
  declinedLoans : number = 0;

  constructor( private api: ApiService, private shared:SharedService){
    this.shared.watchPieUpdates().subscribe((changes: any) => {
      this.refreshAdminPage()
    })
  }
  ngAfterViewInit(): void {
    this.refreshAdminPage()
  }

  refreshAdminPage(): void {
    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          console.log("res", res)
          this.pendingLoans = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'pending').length
          this.approvedLoans = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'approved').length
          this.declinedLoans = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'declined').length
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

}
