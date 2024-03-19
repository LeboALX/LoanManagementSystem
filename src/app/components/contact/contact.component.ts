import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contacts: any[] = JSON.parse(localStorage.getItem('contact') || '[]');
  contactForm: FormGroup;
  constructor(private snackbar: MatSnackBar, private api: ApiService,@Inject(MAT_DIALOG_DATA) public _data: any,
      private dialogRef: MatDialogRef<ContactComponent>){
    if(_data){
      this.contactForm = new FormGroup({
        email: new FormControl(_data.email, [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        name: new FormControl(_data.name, [Validators.required, Validators.minLength(3)]),
        cellphone: new FormControl(_data.cellphone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        textplace: new FormControl(_data.textplace,[Validators.required])
      })
    } else{
      this.contactForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        cellphone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        textplace: new FormControl('',[Validators.required])
      })
    }
   
  }
  submit():void{
    // let formValue = this.contactForm.value;
    // const foundUser = this.contacts.find(user => user.email.toLowerCase() === this.contactForm.get('email')?.value.toLowerCase());
    // if(foundUser) {
    //   this.snackbar.open('User already exist, please login.', 'Ok', {
    //     duration: 3000
    //   })
    // } else {
    //   delete formValue.confirmPassword;
    //   this.contacts.push(formValue);
    //   localStorage.setItem('contacts', JSON.stringify(this.contacts));
    //   this.contactForm.reset();
     
    // }
    const formData = new FormData();
    this.api.genericPost('/add-driver', this. contactForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('res res', res)
          if (res._id) {
            this.snackbar.open('Driver successfully added', 'Ok', { duration: 3000 })
          } else {
            this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
          }
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
    this. contactForm.reset()
  }
  close():void{
    this.dialogRef.close()
  }
  }

