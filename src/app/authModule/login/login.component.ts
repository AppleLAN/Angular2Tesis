import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  error: String;

  constructor(private fb: FormBuilder, private authService: UserAuthenticationService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12)]],      
    });
  }

  submit({ value }: { value: User }) {
    this.authService.signIn(value)
    .subscribe(
      response => {
        if (response) {
            // login successful
            this.router.navigate(['/apps']);
        } else {
            // login failed
            this.error = 'Username or password is incorrect';
        }
      },
      error =>{
        console.log(error);
      }
    )
  }

  goToRegister() {
     this.router.navigate(['/register']);
  } 
}