import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { LoanService } from 'src/app/loan.service';
import { ViewNotificationsComponent } from 'src/app/popUps/view-notifications/view-notifications.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  notificationData: any
  enquiries: any = 0;
  isGoogle: boolean = false
  currentUser: any;
  isOfficer: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
     private sharedService: LoanService, private dialog: MatDialog, private router: Router) {
    this.currentUser = this.sharedService.get('currentUser', 'session');
    if (this.currentUser.role === 'loanOfficer') {
      this.isOfficer = true;
    }

    const enquire = this.sharedService.get('enquiries', 'local')
    if (enquire) {
      this.enquiries = enquire.length
    }
  }

  ngOnInit(): void {
    // this.openNotifications();
  }


  DashBoard(): void {
  }

  openNotifications(): void {
    const data = localStorage.getItem('enquiries');

    if (data) {
      this.notificationData = JSON.parse(data);

      console.log('Notification data retrieved:', this.notificationData);
      this.dialog.open(ViewNotificationsComponent,{
        width: '40%',
      })
    }
  }

  logout():void{
    sessionStorage.clear()
  }
  }

