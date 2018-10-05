import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Rx';
import { Client } from '../../interfaces/client';
import { SpinnerService } from '../../services/spinner.service';
import { UserService } from '../../services/user.service';
import { CompleteUser } from './../../interfaces/complete.user';

@Component({
  selector: 'app-register-company-component',
  templateUrl: './register-company.component.html',
  styleUrls: ['../auth.component.scss', './register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {
  userForm: FormGroup;
  error: String;
  clients: Client;
  userStorage: Subscription;
  userData: CompleteUser;
  options: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
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
    this.userForm = this.fb.group({
      id: [''],
      created_at: [''],
      updated_at: [''],
      deleted_at: [''],
      name: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(30)]
      ],
      fantasyName: ['', [Validators.required, Validators.maxLength(30)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      place: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      codigoPostal: [
        '',
        [Validators.min(0), Validators.minLength(4), Validators.maxLength(30)]
      ],
      codigoProvincia: [
        '',
        [Validators.minLength(4), Validators.maxLength(30)]
      ],
      address: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      telephone: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.minLength(10),
          Validators.maxLength(11)
        ]
      ],
      cuit: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.minLength(11),
          Validators.maxLength(11)
        ]
      ],
      web: ['', [Validators.minLength(6), Validators.maxLength(30)]],
      iib: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      pib: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      epib: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      ivaInscripto: ['', []],
      precioLista: [
        '',
        [Validators.required, Validators.min(0), Validators.maxLength(30)]
      ],
      condicionDeVenta: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      limiteDeCredito: [
        '',
        [Validators.required, Validators.min(0), Validators.maxLength(30)]
      ],
      numeroDeInscripcionesIB: [
        '',
        [Validators.required, Validators.min(0), Validators.maxLength(30)]
      ],
      cuentasGenerales: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      percepcionDeGanancia: [
        '',
        [Validators.required, Validators.maxLength(30)]
      ]
    });
    this.userStorage = this.userService.getUserStorage().subscribe(state => {
      this.userData = state;
      if (state) {
        this.userData.profile.password = null;
        this.userForm.setValue(this.userData.company);
      }
    });
    this.userService.getProfileInfo().subscribe();
  }

  updateClientCompany({ value }: { value: Client }) {
    if (this.userForm.valid) {
      this.spinnerService.displayLoader(true);
      value.type = 'CREATE';
      this.userService.updateClientCompany(value).subscribe(
        response => {
          this.spinnerService.displayLoader(false);
          this.router.navigate(['/apps']);
        },
        error => {
          this.spinnerService.displayLoader(false);
          this.ns.error('Error!', 'Porfavor, compruebe los datos ingresados');
        }
      );
    }
  }
}
