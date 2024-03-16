import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  
  contactForm: FormGroup;
  fileElement: any;
  file: any;
  fileUploadResult: any = 0;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      textarea: new FormControl('', [Validators.required])
    })
  }

  Submit(): void {
    if (this.contactForm.invalid || this.fileUploadResult === 0) {
      this.snackBar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    }
  }

}
