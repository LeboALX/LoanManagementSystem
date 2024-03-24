import { Component, createComponent } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoanService } from 'src/app/loan.service';
import { CreateAccountComponent } from 'src/app/popUps/create-account/create-account.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isOfficer:boolean = false;
  currentUser:any ;
  myProfile:any;
  constructor(private shared:LoanService ,private api:ApiService ,private matdialog:MatDialog){
    const loggedUser = this.shared.get('currentUser','session')
    this.currentUser = loggedUser;

    if(this.currentUser.role){
      this.isOfficer = true
    }

    this.api.genericGet('/get-loans')
    .subscribe({
      next: (res: any) => {
        const myDetails = res.filter((user:any)=>this.currentUser.email === user.email)
        this.myProfile = myDetails;

      },
      error: (err: any) => console.log('Error', err),
      complete: () => { }
    });
    


  }
  edit(received:any):void{
    console.log(received)
    this.matdialog.open(CreateAccountComponent,{data:received ,width:'40%'})
  }
}
