import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-enquire',
  templateUrl: './enquire.component.html',
  styleUrls: ['./enquire.component.scss']
})
export class EnquireComponent {
  enquiries: any;
  @Output() submitted = new EventEmitter<string>();
  messageFormData!: FormGroup;

  constructor(private matdialogRef: MatDialogRef<EnquireComponent>, private snacbar: MatSnackBar, private shared: LoanService) {
    this.messageFormData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      messageArea: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required])
    })
    const myEnquiries = this.shared.get('enquiries', 'local') || []
    if (myEnquiries) {
      this.enquiries = myEnquiries
    }
  }
    submit(): void {
      this.enquiries.push(this.messageFormData.value);
      localStorage.setItem('enquiries', JSON.stringify(this.enquiries));
      this.snacbar.open("you enquiry has been sent successfully", "OK", { duration: 1000 });
      this.matdialogRef.close();

    }
    close(): void {
      this.matdialogRef.close()
    }
  }