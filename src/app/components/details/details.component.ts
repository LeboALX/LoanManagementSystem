import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  isShort:boolean = false;
  isLong:boolean = false;
  isCar : boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private matdialoRef:MatDialogRef<DetailsComponent>){
    if(data==='shortLoan'){
      this.isShort = true
    }else if(data==='carLoan'){
      this.isCar = true
    }else{
      this.isLong =true
    }
  }
  close():void{
    this.matdialoRef.close();
  }

}
