import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoanDetails } from 'src/app/landing/landing.component';
import { LoanService } from 'src/app/loan.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-borrower-table',
  templateUrl: './borrower-table.component.html',
  styleUrls: ['./borrower-table.component.scss']
})
export class BorrowerTableComponent {
  currentUser : any;
  myLoanDetails:any;
  displayedColumns: string[] = ['loanType', 'amount', 'status'];
  status: string[] = ['in-progress', 'approved', 'declined']
  dataSource = new MatTableDataSource<any>();

  constructor(private api:ApiService ,private shared:LoanService){
    const loggedUser =  this.shared.get('currentUser','session')
    if(loggedUser){
      this.currentUser = loggedUser
    }
    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          const myLoans = res.filter((user:any)=> user.email === this.currentUser.email)
          console.log("my table data",myLoans)
          if(myLoans){
            this.dataSource = myLoans
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
