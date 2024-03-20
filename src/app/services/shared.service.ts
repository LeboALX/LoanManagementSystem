import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private inputValueSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  inputValue$: Observable<string> = this.inputValueSubject.asObservable();
  pieSubject = new Subject<any>();
  pieRefresh: boolean = false;
  balanceSubject = new Subject<any>();
  balanceRefresh: boolean = false;

  constructor() { }

  setInputValue(value: string) {
    this.inputValueSubject.next(value);
  }

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
