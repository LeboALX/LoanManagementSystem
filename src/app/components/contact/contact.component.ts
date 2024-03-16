import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  allUsers: any[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
  contactForm: FormGroup;
  constructor(private snackbar: MatSnackBar){
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cellphone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      textplace: new FormControl('',[Validators.required])
    })
  }
  
  submit():void{
    let formValue = this.contactForm.value;
    const foundUser = this.allUsers.find(user => user.email.toLowerCase() === this.contactForm.get('email')?.value.toLowerCase());
    if(foundUser) {
      this.snackbar.open('User already exist, please login.', 'Ok', {
        duration: 3000
      })
    } else {
      delete formValue.confirmPassword;
      this.allUsers.push(formValue);
      localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
      this.contactForm.reset();
     
    }
  }
  }

