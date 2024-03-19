import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  // admin: any[] = JSON.parse(localStorage.getItem('admin') || '[]');
  accountForm!: FormGroup;
  hide = true;

  constructor(private router: Router, private snackbar: MatSnackBar, private email: EmailService, private api: ApiService) {
    this.accountForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }
  
  
    submit():void{
      // let formValue = this.accountForm.value;
      // const foundUser = this.admin.find(user => user.email.toLowerCase() === this.accountForm.get('email')?.value.toLowerCase());
      // if(foundUser) {
      //   this.snackbar.open('User already exist, please login.', 'Ok', {
      //     duration: 3000
      //   })
      // } else {
      //   delete formValue.confirmPassword;
      //   this.admin.push(formValue);
      //   localStorage.setItem('users', JSON.stringify(this.admin));
      //   this.accountForm.reset();
       
       
      // }
    }
    
  }

