declare var google: any;
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/loan.service';
import { FacebookService } from 'src/app/services/facebook.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  isLoading:boolean = false;
  loginForm: FormGroup
  fileElement: any;
  file: any;
  fileUploadResult: any = 0;
  users: any[] = [];
  role: string = '';

  constructor(private snackbar: MatSnackBar, private sharedService: LoanService,
    private router: Router, private matdialogRef: MatDialogRef<LogInComponent>,
    private facebookService: FacebookService) {
    this.users = this.sharedService.get('users', 'local');
    console.log(this.users)

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),

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
      }

      // navigate to home page

    }

  }

  Submit(): void {
    if (this.loginForm.invalid || this.fileUploadResult === 0) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    }
    console.log(this.users)
    const foundUser = this.users.find((user) => user.email === this.loginForm.value.email && user.password === this.loginForm.value.password)
    if (foundUser) {
      if (foundUser.role === 'loanOfficer') {
        this.router.navigate(['/home/loan-officer'])
      } else {
        this.router.navigate(['/home/borrower'])
      }

      sessionStorage.setItem('currentUser', JSON.stringify(foundUser))
      this.snackbar.open('successfully logged in', 'OK', { duration: 1000 })
      this.matdialogRef.close()
    } else {
      console.log("sorryy")
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
