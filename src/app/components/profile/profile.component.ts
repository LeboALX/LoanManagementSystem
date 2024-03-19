import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileDetails: any = {
    fullName: 'Lebogang Mathoto',
    age: 35,
    gender: 'Female',
    idNo: 9605060762082,
    nationality: 'South African',
    surburb: 'Soweto',
    phone: '+27765233256',
    email: 'edward.juska@gmail.com',
    occupation: 'Nurse',
    monthlyGross: 8000,
    currentLoan: 'short-term loan',
    languages: ['english',  'sepedi']
  }

  profileKeys: string[] = Object.keys(this.profileDetails)
}
