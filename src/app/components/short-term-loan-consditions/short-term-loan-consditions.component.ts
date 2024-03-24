import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-short-term-loan-consditions',
  templateUrl: './short-term-loan-consditions.component.html',
  styleUrls: ['./short-term-loan-consditions.component.scss']
})
export class ShortTermLoanConsditionsComponent {

  constructor(private dialogRef: MatDialogRef<ShortTermLoanConsditionsComponent>){}

  close():void{
    this.dialogRef.close();
  }
}
