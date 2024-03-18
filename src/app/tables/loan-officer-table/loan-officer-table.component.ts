import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { LoanService } from 'src/app/loan.service';

@Component({
  selector: 'app-loan-officer-table',
  templateUrl: './loan-officer-table.component.html',
  styleUrls: ['./loan-officer-table.component.scss']
})
export class LoanOfficerTableComponent {
  constructor(private shared:LoanService){
    const tableData = this.shared.get('borrowers','local')
    if(tableData){
      this.dataSource = tableData
    }
  } 
  displayedColumns: string[] = ['fullName', 'idNo', 'gender', 'email', 'action', 'options', 'documents'];
  // displayedHeaders: string[] = ['full Names', 'ID number', 'Gender', 'Email', 'Action', 'Options', 'Documents'];
  applicationAction: string[] = ['Approve', 'Decline'];
  pendingCount: number = 0;
  declinedCount: number = 0;
  approvedCount: number = 0;
  dataSource = new MatTableDataSource<any>();
  applicationOptions: string[] = ['Approve', 'Declined']


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
