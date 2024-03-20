import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoanService } from '../loan.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BorrowersGuard implements CanActivate {
  constructor(private shared: LoanService, private location: Location , private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.shared.get('currentUser', 'session');
    if (!isLoggedIn) {
      return true;
    } else {
      // this.location.back();
      this.router.navigate(['/landing'])
      return false;
    }
  }

}
