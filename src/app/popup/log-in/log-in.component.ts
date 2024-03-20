declare var google: any;
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/loan.service';
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

  constructor(private snackbar: MatSnackBar, private sharedService: LoanService,
    private router: Router, private matdialogRef: MatDialogRef<LogInComponent>,
    private facebookService: FacebookService, private api: ApiService) {
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
      }

      // navigate to home page

    }

  }

  Submit(): void {
    // if (this.loginForm.invalid) {
    //   this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
    //    return;
    //  }
        let formValue = this.loginForm.value;
        this.api.genericPost('/sign-in', formValue)
        .subscribe({
          next: (res: any) => {
            sessionStorage.setItem('currentUser', JSON.stringify(res));
  
            if(this.router.url.includes('login-in')) {
              this.router.navigate(['/home']);
            } else {
              this.submitted.emit('close');
            }          
          },
          error: (err: any) => this.snackbar.open("Failed to login", 'Ok', { duration: 3000 }),
          complete: () => { }
        })
 
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
