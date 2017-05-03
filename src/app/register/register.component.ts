import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
      this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      adress: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', Validators.required],
      confirm: ['', Validators.required],
      app1: [''],
      app2: [''],
      app3: ['']
    });
  } 
  submit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
  }  
}
