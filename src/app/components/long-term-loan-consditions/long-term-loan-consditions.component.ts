import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-long-term-loan-consditions',
  templateUrl: './long-term-loan-consditions.component.html',
  styleUrls: ['./long-term-loan-consditions.component.scss']
})
export class LongTermLoanConsditionsComponent {

  constructor(private dialogRef: MatDialogRef<LongTermLoanConsditionsComponent>){}

  close():void{
    this.dialogRef.close();
  }
}
