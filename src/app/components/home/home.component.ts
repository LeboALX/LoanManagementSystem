import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { LoanService } from 'src/app/loan.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  enquiries:any = 0;
  isGoogle:boolean = false
  currentUser:any ;
  isOfficer:boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver ,private sharedService:LoanService) {
  this.currentUser= this.sharedService.get('currentUser','session');
  if(this.currentUser.role==='loanOfficer'){
    this.isOfficer = true;
  }

  const enquire = this.sharedService.get('enquiries','local')
  if(enquire){
    this.enquiries = enquire.length
  }
  
}


DashBoard():void{
}
}
