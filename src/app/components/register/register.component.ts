import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailService } from 'src/app/services/email.service';
// import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() submitted = new EventEmitter<string>();
  signUpForm!: FormGroup;
  loanTypes: string[] = ['short term loan', 'long term loan', 'vehicle loan']
  hide = true;
  fileElement: any;
  file: any;
  fileUploadResult: any = 0;

  constructor(private router: Router, private snackbar: MatSnackBar, private email: EmailService ,private api:ApiService) {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      loanAmount: new FormControl('', [Validators.required]),
      IDnumber: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      address: new FormGroup({
        streetName: new FormControl('', [Validators.required]),
        streetNumber: new FormControl('', [Validators.required]),
        suburb: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        code: new FormControl('', [Validators.required])
      }),
      monthlyIncome: new FormControl('', Validators.required),
      monthlyExpenses: new FormControl('', Validators.required),
      loanType: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  ngAfterViewInit(): void {
    // Get file input element
    this.fileElement = document.getElementById('file') as HTMLInputElement;
    console.log("this.fileElement", this.fileElement)
  }

  fileUpload(e: any): void {
    this.file = e.target.files[0]
    console.log("File name", this.file.name)

    const reader = new FileReader();
    console.log('reader', reader)
    this.fileUploadResult = this.fileElement.files.length
  }

  submit(): void {
    if (this.signUpForm.invalid) return;

    if (this.signUpForm.get('password')?.value !== this.signUpForm.get('confirmPassword')?.value) {
      this.signUpForm.get('confirmPassword')?.setErrors({ 'pattern': true });
      this.snackbar.open('Passwords do not match!!','Ok',{duration:3000})
      return;
    }

    let formValue = this.signUpForm.value;
    delete formValue.confirmPassword;

    this.email.genericPost('/send-email', formValue)
      .subscribe({
        next: (res) => { console.log(res) },
        error: (err) => { console.log(err) },
        complete: () => { console.log("email sent successfully"),this.snackbar.open('email successfully sent to a client','OK',{duration:1000}) }
      })

    this.api.genericPost('/add-user', this.signUpForm.value)
    .subscribe({
      next: (res: any) => {
        console.log('User res._id', res._id)
        if (res._id) {
          this.snackbar.open('Applied Successfully', 'Ok', { duration: 3000 })
        } else {
          this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
        }
      },
      error: (err: any) => console.log('Error', err),
      complete: () => { }
    });

    // Upload file only
    const formData = new FormData();
    formData.append('file', this.file, this.file.name,);
    this.api.genericPost('/upload', formData)
      .subscribe({
        next: (res: any) => {
          console.log('file upload res', res)
          if (res.file._id) {
            console.log('File uploaded successfully');
          } else {
            this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

}
