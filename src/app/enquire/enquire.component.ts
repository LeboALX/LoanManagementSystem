import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquire',
  templateUrl: './enquire.component.html',
  styleUrls: ['./enquire.component.scss']
})
export class EnquireComponent {

  @Output() submitted = new EventEmitter<string>();
  messageFormData!:FormGroup;

  constructor(){
    this.messageFormData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      messageArea: new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required])
    })
  }

  submit():void{
    
  }
}
