import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../interfaces/client';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CompleteUser } from './../../interfaces/complete.user';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-register-company-component',
  templateUrl: './register-company.component.html',
  styleUrls: ['../auth.component.scss']
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
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      place: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      codigoPostal: ['', [Validators.minLength(4), Validators.maxLength(30)]],
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
          Validators.minLength(10),
          Validators.maxLength(11)
        ]
      ],
      cuit: [
        '',
        [
          Validators.required,
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
      precioLista: ['', [Validators.required, Validators.maxLength(30)]],
      condicionDeVenta: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      limiteDeCredito: ['', [Validators.required, Validators.maxLength(30)]],
      numeroDeInscripcionesIB: [
        '',
        [Validators.required, Validators.maxLength(30)]
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
    value.type = 'CREATE';
    this.userService.updateClientCompany(value).subscribe(response => {
      if (response) {
        this.router.navigate(['/apps']);
      } else {
        this.error = 'Error';
      }
    });
  }
}
