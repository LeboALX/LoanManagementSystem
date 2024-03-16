import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup
  genders: string [] = ['Female', 'Male']

  constructor() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      streetName: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required])

    })
  }


}
