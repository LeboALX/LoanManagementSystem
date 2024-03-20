import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/loan.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() submitted = new EventEmitter<string>();
  applyLoanForm!: FormGroup;
  loanTypes: string[] = ['short term loan', 'long term loan', 'vehicle loan']
  hide = true;
  hide2 = true
  fileElement: any;
  file: any;
  fileUploadResult: any = 0;
  foundLoan: any;

  constructor(private api: ApiService, private router: Router, private snackbar: MatSnackBar, 
              private dialogRef: MatDialogRef<RegisterComponent>, @Inject(MAT_DIALOG_DATA) public _data: any) {
    this.applyLoanForm = new FormGroup({
      duration: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      cellNumber: new FormControl('', [Validators.required]),
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
      profileImage: new FormControl('', [Validators.required]),
      loanStatutus: new FormControl('Pending'),
      balance: new FormControl('')
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

  async submit() {
    let formValue = this.applyLoanForm.value;
    delete formValue.confirmPassword;

    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          const foundUser = res.find((_data: any) => this.applyLoanForm.get("IDnumber")?.value == _data.IDnumber)
          if (foundUser) {
            this.snackbar.open("You have outstanding Loan","Ok",{duration:3000});
            return;
          }
          else{
            this.api.genericPost('/apply-loan', this.applyLoanForm.value)
            .subscribe({
              next: (res: any) => {
                this.close()
                this.snackbar.open('Applied Successfully', 'Ok', { duration: 3000 })
              },
              error: (err: any) => console.log('Error', err),
              complete: () => { }
            });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      })




    try {
      const imageURL = await this.uploadImage();
      console.log('imageURL', imageURL);

      this.applyLoanForm.patchValue({
        profileImage: imageURL,

      })

    } catch (error) {
      console.log(error)
    }

  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      // Upload file only
      const formData = new FormData();
      formData.append('file', this.file, this.file.name,);
      this.api.genericPost('/upload', formData)
        .subscribe({
          next: (res: any) => {
            console.log('file upload res', res)
            if (res.file._id) {
              console.log('File uploaded successfully');
              resolve(`${environment.nodeAppUrl}/download/${res.file.fileId}`)
            } else {
              this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
            }
          },
          error: (err: any) => {
            console.log('Error', err)
            reject(err)
          },
          complete: () => { }
        });
    })

  }

  close(): void { this.dialogRef.close() }
}
