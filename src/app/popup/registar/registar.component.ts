import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.scss']
})
export class RegistarComponent implements OnInit {
  isSubmit:boolean = true;
  registarForm: FormGroup;
  fileElement: any;
  file: any;
  fileUploadResult: any = 0;

  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<RegistarComponent>) {
    this.registarForm = new FormGroup({
      name: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/),Validators.required]),
      phoneNumber: new FormControl(''),
      id: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      confirmPassword: new FormControl('',Validators.required),
      streetName: new FormControl('',Validators.required),
      streetNumber: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      code: new FormControl('',Validators.required),
      //  selected: new FormControl('', Validators.pattern('valid')]),
      loanAmount: new FormControl('',Validators.required),
      duration: new FormControl(''),
      grossMonthlyIncome: new FormControl(''),
      monthlyExpense: new FormControl('')

    })
  }

  ngOnInit(): void {
    // Get file input element
    this.fileElement = document.getElementById('file') as HTMLInputElement;
  }

  fileUpload(e: any): void {
    this.file = e.target.files[0]
    const reader = new FileReader();
    console.log('reader', reader)
    this.fileUploadResult = this.fileElement.files.length
  }

  Submit(): void {
    // if (this.registarForm.invalid || this.fileUploadResult === 0) {
    //   this.snackBar.open('All fields are required', 'Ok', { duration: 3000 });
    //   return;
    // }

    //removing confirm Password
    // let formValue = this.registarForm.value;
    // delete formValue.confirmPassword;
    // if (this.registarForm.invalid && this.fileUploadResult === 0) return
    // if (this.registarForm.get('password')?.value !== this.registarForm.get('confirmPassword')?.value) {
    //   this.registarForm.get('confirmPassword')?.setErrors({ 'pattern': true });
    //   return;
    // }

    if(this.registarForm.value.password != this.registarForm.value.confirmPassword){
      console.log("password do not match")
    }

    console.log(this.registarForm.value)

  }

  close(): void {
    this.dialogRef.close()
  }

}
