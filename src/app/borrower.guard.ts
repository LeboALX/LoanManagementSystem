import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanService } from './loan.service';
import { Router } from 'express';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BorrowerGuard implements CanActivate {
  constructor(private shared: LoanService , private router: Router, private location: Location){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.shared.get('currentUser','session');
    if(!isLoggedIn) {
      return true;
    } else {
      this.location.back();
      // this.router.navigate(['/log-in'])
      return false;
    }
  }

}
