import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
loginForm: FormGroup
fileElement: any;
file: any;
fileUploadResult: any = 0;

constructor( private snackbar: MatSnackBar){
  this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
   
  })
  
}
ngOnInit(): void {
  // Get file input element
  this.fileElement = document.getElementById('file') as HTMLInputElement;
}

Submit(): void{
  if (this.loginForm.invalid || this.fileUploadResult === 0) {
    this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
    return;
  }
}
}
