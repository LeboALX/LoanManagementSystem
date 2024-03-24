import { Component } from '@angular/core';
import { LoanService } from 'src/app/loan.service';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  creditScore: any = 0;
  constructor(private api: ApiService, private shared: LoanService){
    this.api.genericGet('/get-registered-user')
    .subscribe({
      next: (res: any) => {
        const loggedUser = this.shared.get('currentUser','session')
        const user = res.filter((user: any) => user.email === loggedUser.email)
        if(user)
        {
          this.creditScore = user[0].creditScore
        }
       console.log("Registered users", res)
      },
      error: (err: any) => console.log('Error', err),
      complete: () => { }
    });
  }
}
