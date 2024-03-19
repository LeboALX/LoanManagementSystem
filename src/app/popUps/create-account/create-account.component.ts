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
    const localBorrowers = this.shared.get('users','local');
    if(localBorrowers){
      this.borrowers = localBorrowers;
    }
  }
  
  submit(): void {
    const existingUser = this.borrowers.find((user:any)=> user.email ===this.accountForm.value.email)
    if(existingUser){
      this.snackbar.open(`user with email ${existingUser.email} exist`,"OK",{duration:1000})
      this.matdialogRef.close()
      return
    }else{
      this.borrowers.push(this.accountForm.value)
      localStorage.setItem('users',JSON.stringify(this.borrowers))
      this.snackbar.open("account created successfully")
      this.email.genericPost('/send-email', this.accountForm.value)
      .subscribe({
        next: (res) => { console.log(res) },
        error: (err) => { console.log(err) },
        complete: () => { console.log("email sent successfully"),this.snackbar.open('email successfully sent to a client','OK',{duration:1000}) }
      })

      this.matdialogRef.close()
    }
  }
}
