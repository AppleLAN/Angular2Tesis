import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
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
  options: any;

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private router: Router
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
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
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      address: ['', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required, this.dateValidator]],
      sales: [''],
      stock: [''],
      clients: [''],
      providers: ['']
    });
  }

  dateValidator(control: FormControl) {
    let actualDate = new Date();
    actualDate.setHours(0);
    actualDate.setMinutes(0);
    actualDate.setSeconds(0);
    actualDate.setMilliseconds(0);
    let formDate = new Date(control.value);
    formDate.setHours(formDate.getHours() + 3);
    if (formDate < actualDate) {
      return null;
    } else if(formDate instanceof Date && !isNaN(formDate.getTime())) {
      return { dateValidator: 'bad date' };
    }
  }

  submit({ value }: { value: User }) {
    if (this.registerForm.valid) {
      this.authService.register(value).subscribe(response => {
        if (response) {
          // login successful
          this.router.navigate(['/apps']);
        } else {
          // login failed
          this.error = 'Usuario o contrasenia incorrecto';
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
