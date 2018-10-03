import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { NotificationsService } from 'angular2-notifications';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  options: any;

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private router: Router,
    private ns: NotificationsService,
    private spinnerService: SpinnerService
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
      ]
    });
  }

  submit({ value }: { value: User }) {
    this.spinnerService.displayLoader(true);
    this.authService.signIn(value).subscribe(
      response => {
        this.spinnerService.displayLoader(false);
        // login successful
        this.router.navigate(['/apps']);
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', 'Porfavor, compruebe los datos ingresados');
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
