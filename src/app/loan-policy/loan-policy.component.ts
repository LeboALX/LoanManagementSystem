import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loan-policy',
  templateUrl: './loan-policy.component.html',
  styleUrls: ['./loan-policy.component.scss']
})
export class LoanPolicyComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){
    console.log("Injected",data)
  }
}
