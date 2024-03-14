import { Component } from '@angular/core';

@Component({
  selector: 'app-loan-officer',
  templateUrl: './loan-officer.component.html',
  styleUrls: ['./loan-officer.component.scss']
})
export class LoanOfficerComponent {
  sideNav: any[] = [
    {label: 'Dashboard', icon: 'dashboard', route: ''},
    {label: 'Borrower', icon: 'calendar_month', route: ''},
    {label: 'Policies', icon: 'attach_file', route: ''},
    {label: 'Enquiries', icon: 'message', route: ''},
    {label: 'Logout', icon: 'logout', },
  ]
}
