import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
import { CompleteUser } from '../../../interfaces/complete.user';
import { User } from '../../../interfaces/user';
import { SharedService } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';

declare var jQuery: any;

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile.modal.html'
})
export class ProfileModal implements OnInit {
  clients: Client;
  userForm: FormGroup;
  registerForm: FormGroup;
  newSubUserForm: FormGroup;
  error: String;
  userStorage: Subscription;
  userData: CompleteUser;
  options: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ns: NotificationsService,
    private sharedService: SharedService
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

    this.registerForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
      ],
      password: ['', [Validators.minLength(6), Validators.maxLength(12)]],
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
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      address: ['', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required]],
      company_id: [''],
      sales: [''],
      stock: [''],
      clients: [''],
      providers: [''],
      isAdmin: ['']
    });

    this.newSubUserForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
      ],
      password: ['', [Validators.minLength(6), Validators.maxLength(12)]],
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
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      address: ['', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required]],
      company_id: [''],
      sales: [''],
      stock: [''],
      clients: [''],
      providers: [''],
      isAdmin: ['']
    });

    this.userStorage = this.userService.getUserStorage().subscribe(state => {
      this.setFormData(state);
    });
    this.userService.getProfileInfo().subscribe(
      response => {},
      error => this.ns.error('Error!', error)
    );
  }

  private setFormData(state: CompleteUser) {
    this.userData = state;
    if (state) {
      this.userData.profile.password = null;
      this.registerForm.setValue(this.userData.profile);
      this.userForm.setValue(this.userData.company);
    }
  }

  refresh() {
    jQuery('.ui.modal.profile-modal').modal('refresh');
  }

  showModal() {
    this.newSubUserForm.reset();
    this.setFormData(this.userData);
    jQuery('.ui.modal.profile-modal').modal('show');
  }

  responsableChange(formControl: FormControl) {
    this.sharedService.responsableChange(formControl, this.userForm);
  }

  updateClientInfo({ value }: { value: User }) {
    this.userService
      .updateClientInfo(value)
      .subscribe(
        suc => this.ns.success('Perfecto!', 'Su cliente ha sido actualizado'),
        error => this.ns.error('Error!', error)
      );
  }

  updateClientCompany({ value }: { value: Client }) {
    value.type = 'UPDATE';
    this.userService
      .updateClientCompany(value)
      .subscribe(
        suc => this.ns.success('Perfecto!', 'Su compañia ha sido actualizada'),
        error => this.ns.error('Error!', error)
      );
  }
  createSubClient({ value }: { value: User }) {
    this.userService
      .createSubClient(value)
      .subscribe(
        suc => this.ns.success('Perfecto!', 'Su sub-cliente ha sido creado'),
        error => this.ns.error('Error!', error)
      );
  }
}
