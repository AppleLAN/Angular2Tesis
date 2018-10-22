import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { User } from '../../interfaces/user';
import { SpinnerService } from '../../services/spinner.service';
import { UserAuthenticationService } from '../../services/user-authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  options: any;

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private router: Router,
    private spinnerService: SpinnerService,
    private ns: NotificationsService
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    localStorage.removeItem('currentUser');
    this.registerForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
      ],
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
      ],
      lastname: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30)]
      ],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      birthday: ['', [Validators.required, this.dateValidator]],
      sales: [false],
      stock: [false],
      clients: [false],
      providers: [false]
    });
  }

  dateValidator(control: FormControl) {
    const actualDate = new Date();
    actualDate.setHours(0);
    actualDate.setMinutes(0);
    actualDate.setSeconds(0);
    actualDate.setMilliseconds(0);
    const formDate = new Date(control.value);
    formDate.setHours(formDate.getHours() + 3);
    if (formDate < actualDate) {
      return null;
    } else if (formDate instanceof Date && !isNaN(formDate.getTime())) {
      return { dateValidator: 'bad date' };
    }
  }

  submit({ value }: { value: User }) {
    if (this.registerForm.valid) {
      this.spinnerService.displayLoader(true);
      this.authService.register(value).subscribe(
        response => {
          this.spinnerService.displayLoader(false);
          // login successful
          this.router.navigate(['/apps']);
        },
        error => {
          this.spinnerService.displayLoader(false);
          if (error.error.includes('Duplicate')) {
            this.ns.error('Error!', 'Email existente, por favor ingrese un email diferente');
          } else {
            this.ns.error('Error!', 'Porfavor, compruebe los datos ingresados');
          }
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
