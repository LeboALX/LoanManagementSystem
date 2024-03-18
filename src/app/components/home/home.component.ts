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
}


DashBoard():void{
}
}
