import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: String;
  loading: Boolean;

  constructor(private fb: FormBuilder, private authService: UserAuthenticationService, private router: Router,) {}
  ngOnInit() {
      this.registerForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
        password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
        name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(12)]],
        lastname: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(12)]],
        email: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
        address: ['', [Validators.required, Validators.minLength(3)]],
        birthday: ['', [Validators.required]],
        sales: [''],
        stock: [''],
        clients: [''],
        providers: [''],
      });
  } 
  submit({ value, valid }: { value: User, valid: boolean }) {
    this.authService.register(value)
    .subscribe(
      response => {
        if (response) {
            // login successful
            this.router.navigate(['/apps']);
        } else {
            // login failed
            this.error = 'Username or password is incorrect';
            this.loading = false;
        }
      },
    )
  } 

  cancel(){
    this.router.navigate(['/login']);
  } 
}


