import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-loan-officer-table',
  templateUrl: './loan-officer-table.component.html',
  styleUrls: ['./loan-officer-table.component.scss']
})
export class LoanOfficerTableComponent {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'action', 'options'];
  applicationOptions: string[] = ['Approve', 'Declined'];
  pendingCount: number = 0;
  declinedCount: number = 0;
  approvedCount: number = 0;
  dataSource = new MatTableDataSource<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
