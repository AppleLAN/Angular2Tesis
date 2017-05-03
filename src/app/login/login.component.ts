import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
     this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],      
    });
  } 
  submit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
  } 
}