import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanService } from '../loan.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-enquire',
  templateUrl: './enquire.component.html',
  styleUrls: ['./enquire.component.scss']
})
export class EnquireComponent {
  enquiries: any;
  @Output() submitted = new EventEmitter<string>();
  messageFormData!: FormGroup;

  constructor(private dialogRef: MatDialogRef<EnquireComponent>, private snacbar: MatSnackBar, private shared: LoanService, 
    private api: ApiService,  @Inject(MAT_DIALOG_DATA) public _data: any) {
      if(_data){
        this.messageFormData = new FormGroup({
          email: new FormControl(_data.email, [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
          messageArea: new FormControl(_data.messageArea, [Validators.required]),
          subject: new FormControl(_data.subject, [Validators.required]),
          fullName: new FormControl(_data.fullName, [Validators.required])
        })
      }else{
        this.messageFormData = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
          messageArea: new FormControl('', [Validators.required]),
          subject: new FormControl('', [Validators.required]),
          fullName: new FormControl('', [Validators.required])
        })
      }
  }
  submit(): void{
    let formValue = this.messageFormData.value;
    this.api.genericPost('/send-enquiry', formValue)
      .subscribe({
        next: (res: any) => {
          this.messageFormData.reset();
          this.snacbar.open('Enquiry sent successfully','Ok',{duration:3000})
          console.log(res)
          this.close();
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
      this.dialogRef.close()
  }
    close(): void {
      this.dialogRef.close()
    }

  }