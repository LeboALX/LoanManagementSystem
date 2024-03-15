import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-borrower-table',
  templateUrl: './borrower-table.component.html',
  styleUrls: ['./borrower-table.component.scss']
})
export class BorrowerTableComponent {
  displayedColumns: string[] = ['loanType', 'amount', 'status'];
  status: string[] = ['in-progress', 'approved', 'declined']
  dataSource = new MatTableDataSource<any>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
