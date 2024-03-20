import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailsComponent } from '../components/details/details.component';

@Component({
  selector: 'app-loan-policy',
  templateUrl: './loan-policy.component.html',
  styleUrls: ['./loan-policy.component.scss']
})
export class LoanPolicyComponent {
  
  isPersonal: boolean = false;
  isCarLoan: boolean = false;
  isShortTerm: boolean = false;
  constructor(private matdialog:MatDialog) {


   
}
Policy(received:string):void{
  console.log(received)
  this.matdialog.open(DetailsComponent,{data:received ,width:'40%'})
}
}
