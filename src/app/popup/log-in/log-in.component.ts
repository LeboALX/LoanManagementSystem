declare var google: any;
import { Component, EventEmitter, OnInit, Output, createComponent } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/loan.service';
import { CreateAccountComponent } from 'src/app/popUps/create-account/create-account.component';
import { ApiService } from 'src/app/services/api.service';
import { FacebookService } from 'src/app/services/facebook.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  @Output() submitted = new EventEmitter<string>();
  isLoading: boolean = false;
  loginForm: FormGroup
  fileElement: any;
  file: any;
  fileUploadResult: any = 0;
  users: any[] = [];
  role: string = '';
  borrowers: any = [];
  admin = {
    fullName : "Administrator",
    role : "loanOfficer",
    email : "admin@zaka.com",
    password : "Admin@123"
  }

  constructor(private snackbar: MatSnackBar, private sharedService: LoanService,
    private router: Router, private matdialogRef: MatDialogRef<LogInComponent>,
    private facebookService: FacebookService, private api: ApiService , private matdialog:MatDialog) {
    this.users = this.sharedService.get('users', 'local');
    this.borrowers = this.sharedService.get('borrowers', 'local');

    console.log(this.users)

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),

    })

  }
  ngOnInit(): void {
    // Get file input element
    this.fileElement = document.getElementById('file') as HTMLInputElement;
    // intialize google client id
    google.accounts.id.initialize({
      client_id: '797939695613-nlq355cd61l5ud03bd45a6r3rubufal0.apps.googleusercontent.com',
      callback: (res: any) => {
        console.log(res)
        this.handleLogin(res)

      }
    });
    // render and customize the sign in button
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_white',
      size: 'xxx-large',
      shape: 'rectangle',
      width: 100,
    })
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleLogin(response: any) {
    if (response) {
      // decode the encoded credentials
      const payLoad = this.decodeToken(response.credential);
      // store it in session storage
      const matchingUser = this.users.find((user) => user.email === payLoad.email)
      console.log(matchingUser)
      if (matchingUser) {
        sessionStorage.setItem('currentUser', JSON.stringify(matchingUser))
        this.router.navigate(['home/loan-officer']);
        this.snackbar.open('successfully logged in', 'OK', { duration: 1000 })
        this.matdialogRef.close();
      }else{
        this.snackbar.open("User not found , please register and log it again..")
        
      }

      // navigate to home page

    }

  }

  Submit(): void {
 
    if (this.loginForm.invalid) return;

    let formValue = this.loginForm.value;

    if(formValue.email === this.admin.email && formValue.password === this.admin.password){
      sessionStorage.setItem('currentUser',JSON.stringify(this.admin))
      this.router.navigate(['home/loan-officer']);
      this.matdialogRef.close();
      this.snackbar.open('successfully logged In','OK',{duration : 1000})
    }else{
      this.api.genericGet('/getAllUsers')
      .subscribe({
        next: (res: any) => {
          console.log("aowa wena",res)
          const foundUser = res.find((user:any)=> user.email === formValue.email
          )
          if(foundUser){
            sessionStorage.setItem('currentUser',JSON.stringify(foundUser))
           
            if(foundUser.role){
              this.router.navigate(['home/loan-officer']);
              this.matdialogRef.close();
              this.snackbar.open('successfully logged In','OK',{duration : 3000})
            }else{
              this.router.navigate(['home/borrower']);
              this.matdialogRef.close();
              this.snackbar.open('successfully logged In','OK',{duration : 3000})
            }
          }else{
            this.matdialogRef.close()
            this.matdialog.open(CreateAccountComponent,{width : '35%', height:"90%"})
            this.snackbar.open("log In unsuccesful ,please register",'OK' ,{duration:2000})
            return
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
    }



  }
  async signInWithFacebook(): Promise<void> {
    try {
      const authResponse = await this.facebookService.login();
      this.snackbar.open('successfully logged in', 'OK')
      this.isLoading = true;
      this.router.navigate(['/home/loan-officer'])
      this.matdialogRef.close()
      // Handle successful login (e.g., send token to backend)
      console.log('Facebook login successful:', authResponse);
    } catch (error) {
      // Handle login error
      console.error('Facebook login error:', error);
    }
  }



  signOut(): void {
    this.facebookService.logout();
  }
  close(): void {
    this.matdialogRef.close()
  }
}
