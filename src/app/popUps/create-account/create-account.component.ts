import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/loan.service';
import { ApiService } from 'src/app/services/api.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  // admin: any[] = JSON.parse(localStorage.getItem('admin') || '[]');
  borrowers: any =[]
  accountForm!: FormGroup;
  hide = true;

  constructor(private router: Router, private snackbar: MatSnackBar, private email: EmailService, private api: ApiService, private shared:LoanService,private matdialogRef:MatDialogRef<CreateAccountComponent>) {
    this.accountForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }
  
  submit(): void {
    this.api.genericPost('/register', this.accountForm.value)
      .subscribe({
        next: (res: any) => {
          if (res._id) {
            this.snackbar.open('Registered Successfully', 'Ok', { duration: 3000 })
          } else {
            this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }
}
