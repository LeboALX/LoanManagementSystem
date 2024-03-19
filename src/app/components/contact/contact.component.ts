import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  isReply:boolean = false;
  contacts: any[] = JSON.parse(localStorage.getItem('contact') || '[]');
  contactForm: FormGroup;
  constructor(private snackbar:MatSnackBar ,private api:ApiService,private matdialog:MatDialog){
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cellphone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      textplace: new FormControl('',[Validators.required])
    })
  }
  

  
  
  }

