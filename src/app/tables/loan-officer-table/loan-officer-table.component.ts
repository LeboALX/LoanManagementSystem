import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { LoanService } from 'src/app/loan.service';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-loan-officer-table',
  templateUrl: './loan-officer-table.component.html',
  styleUrls: ['./loan-officer-table.component.scss']
})
export class LoanOfficerTableComponent { 
  displayedColumns: string[] = ['fullName', 'idNo', 'gender', 'email', 'action', 'options', 'documents'];
  // displayedHeaders: string[] = ['full Names', 'ID number', 'Gender', 'Email', 'Action', 'Options', 'Documents'];
  applicationAction: string[] = ['Approve', 'Decline'];
  pendingCount: number = 0;
  declinedCount: number = 0;
  approvedCount: number = 0;
  dataSource = new MatTableDataSource<any>();

  constructor(private api: ApiService, private snackbar:MatSnackBar, private sharedService:SharedService){
    this.refreshAdminPage()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshAdminPage(): void {
    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          console.log("res", res)
          this.dataSource = res;
          this.pendingCount = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'pending').length
          this.declinedCount = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'declined').length
          this.approvedCount = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'approved').length
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  updateStatus(loan: any, status: any) {
    let updateStatusTo;
    switch (status.toLowerCase()) {
      case 'approve':
        updateStatusTo = 'approved';
        break;
      default:
        updateStatusTo = 'declined';
        break;
    }
    this.api.genericPost(`/update-user/${loan._id}`, { loanStatutus: updateStatusTo })
      .subscribe({
        next: (res: any) => {
          if(res.modifiedCount === 1){
            this.snackbar.open('Status updated','Ok',{duration: 3000});
            this.refreshAdminPage();
            this.sharedService.refreshPie();
          }else {
            this.snackbar.open('Something went wrong ...','Ok',{duration: 3000});
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }
  deleteUser(user: any): void {
    this.api.genericDelete(`/delete-user/${user._id}`)
      .subscribe({
        next: (res: any) => {
          if(res.deletedCount === 1){
            this.snackbar.open('Successfully deleted User loan Application','Ok',{duration: 3000});
            this.refreshAdminPage();
            this.sharedService.refreshPie();
          }else {
            this.snackbar.open('Something went wrong ...','Ok',{duration: 3000});
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }
}
