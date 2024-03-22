import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  hide2 = true;
  isEdit : Boolean = false;

  constructor(private router: Router, private snackbar: MatSnackBar,private api: ApiService,
     private shared:LoanService,private matdialogRef:MatDialogRef<CreateAccountComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private emailService:EmailService) {
      if(data){
        this.accountForm = new FormGroup({
          fullName: new FormControl(data.fullName, [Validators.required]),
          email: new FormControl(data.email, [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
          cellNumber: new FormControl(data.cellNumber, [Validators.required])
          
        })
        this.isEdit = true
      
      }else{
        this.accountForm = new FormGroup({
          fullName: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
          cellNumber: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
          confirmPassword: new FormControl('', [Validators.required])
        })
      }
 
   
  }

  submit(): void {
    this.api.genericGet('/get-registered-user')
      .subscribe({
        next : (res: any) => {
            console.log( "all users",res);
            const existing = res.find((user:any)=> user.email === this.accountForm.value.email)
            if(existing){
              this.snackbar.open("user already exist in the system please login","OK",{duration:1000})
              return
            }else{
              this.api.genericPost('/register', this.accountForm.value)
              .subscribe({
                next: (res: any) => {
                  if (res._id) {
                    close()
                    this.snackbar.open('Registered Successfully', 'Ok', { duration: 3000 })
                    this.api.sendOtp(this.accountForm.get('cellNumber')?.value).subscribe(
                      response => {
                        console.log("response OTP",response)
                        this.snackbar.open("OTP sent","Ok",{duration:3000})
                      },
                      error => {
                        console.error('Error sending OTP:', error);
                      }
                    );
                    this.emailService.genericPost('/send-email', this.accountForm.value)
                    .subscribe({
                      next: (res) => { console.log(res) },
                      error: (err) => { console.log(err) },
                      complete: () => { console.log("email sent successfully")}
                    })
                    
        
                  } else {
                    this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
                  }
                },
                error: (err: any) => console.log('Error', err),
                complete: () => { }
              });
            }
        },
        error:(err:any) => {console.log(err)}
        ,
        complete:()=>{}
      })
     
  }
  Update():void{

    console.log('updating')
  }
  close():void{
    this.matdialogRef.close()
  }
}
