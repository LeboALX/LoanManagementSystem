import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  pieSubject = new Subject<any>();
  pieRefresh: boolean = false;
  balanceSubject = new Subject<any>();
  balanceRefresh: boolean = false;

  constructor() { }

  refreshPie(): void {
    this.pieRefresh = true;
    this.pieSubject.next(this.pieRefresh)
  }

  watchPieUpdates(): Observable<any> {
    return this.pieSubject.asObservable();
  }

  refreshBalance(): void {
    this.balanceRefresh = true;
    this.balanceSubject.next(this.balanceRefresh)
  }

  watchBalanceUpdates(): Observable<any> {
    return this.balanceSubject.asObservable();
  }


}
