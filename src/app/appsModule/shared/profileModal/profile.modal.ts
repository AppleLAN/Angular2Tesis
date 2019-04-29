import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
import { CompleteUser } from '../../../interfaces/complete.user';
import { User } from '../../../interfaces/user';
import { SharedService, documentTypes, retentionTypes } from '../../../services/shared.service';
import { UserService } from '../../../services/user.service';
import { ValidationService } from '../../../services/validation.service';

declare var jQuery: any;

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile.modal.html'
})
export class ProfileModal implements OnInit {
  documentTypes = documentTypes;
  retentionTypes = retentionTypes;
  clients: Client;
  userForm: FormGroup;
  registerForm: FormGroup;
  newSubUserForm: FormGroup;
  error: String;
  userStorage: Subscription;
  userData: CompleteUser;
  options: any;
  cuenta: any = null;
  internalUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ns: NotificationsService,
    private sharedService: SharedService,
    private vs: ValidationService
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
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      fantasyName: ['', [Validators.required, Validators.maxLength(30), this.vs.emptySpaceValidator]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      place: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      codigoPostal: [
        '',
        [Validators.required, Validators.min(0), Validators.minLength(4), Validators.maxLength(30), this.vs.emptySpaceValidator]
      ],
      codigoProvincia: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.min(0), this.vs.emptySpaceValidator]
      ],
      address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      telephone: [
        '',
        [Validators.required, Validators.min(0), Validators.minLength(9), Validators.maxLength(9), this.vs.emptySpaceValidator]
      ],
      cuit: ['', [Validators.required, Validators.min(0), Validators.minLength(11), Validators.maxLength(11), this.vs.emptySpaceValidator]],
      tipoDocumento: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      documento: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      web: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      cuentasGenerales: ['Cuenta Interna', []]
    });

    this.userForm.get('fantasyName').disable();
    this.userForm.get('cuit').disable();

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      birthday: ['', [Validators.required, this.vs.dateValidator]],
      company_id: [''],
      sales: [false],
      stock: [false],
      clients: [false],
      providers: [false],
      isAdmin: ['']
    });

    this.newSubUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(12)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      birthday: ['', [Validators.required, this.vs.dateValidator]],
      company_id: [''],
      sales: [false],
      stock: [false],
      clients: [false],
      providers: [false],
      isAdmin: ['']
    });

    this.userStorage = this.userService.getUserStorage().subscribe(state => {
      this.setFormData(state);
    });
    this.userService.getProfileInfo().subscribe(response => {}, error => this.ns.error('Error!', error.error.error));
    this.userService
      .getAllInternalUsers()
      .subscribe(response => (this.internalUsers = response), error => this.ns.error('Error!', error.error.error));
  }

  private setFormData(state: CompleteUser) {
    this.userData = state;
    if (state) {
      this.userData.profile.password = null;
      if (this.userData.profile) {
        this.registerForm.setValue(this.userData.profile);
        if (this.userData.profile.clients) {
          this.newSubUserForm.get('clients').setValue(1);
          this.newSubUserForm.get('clients').enable();
        } else {
          this.newSubUserForm.get('clients').setValue(0);
          this.newSubUserForm.get('clients').disable();
        }
        if (this.userData.profile.stock) {
          this.newSubUserForm.get('stock').setValue(1);
          this.newSubUserForm.get('stock').enable();
        } else {
          this.newSubUserForm.get('stock').setValue(0);
          this.newSubUserForm.get('stock').disable();
        }
        if (this.userData.profile.providers) {
          this.newSubUserForm.get('providers').setValue(1);
          this.newSubUserForm.get('providers').enable();
        } else {
          this.newSubUserForm.get('providers').setValue(0);
          this.newSubUserForm.get('providers').disable();
        }
        if (this.userData.profile.sales) {
          this.newSubUserForm.get('sales').setValue(1);
          this.newSubUserForm.get('sales').enable();
        } else {
          this.newSubUserForm.get('sales').setValue(0);
          this.newSubUserForm.get('sales').disable();
        }
      }
      if (this.userData.company) {
        this.userForm.patchValue(this.userData.company);
        this.cuenta = this.userData.company.cuentasGenerales;
      }
    }
  }

  checkDocumentType(event: any) {
    this.sharedService.checkDocumentType(event, this.userForm);
  }

  refresh() {
    setTimeout(() => {
      jQuery('.profile-modal').modal('refresh');
    }, 0);
  }

  showModal() {
    this.newSubUserForm.reset();
    this.newSubUserForm.get('sales').setValue(false);
    this.newSubUserForm.get('providers').setValue(false);
    this.newSubUserForm.get('stock').setValue(false);
    this.newSubUserForm.get('clients').setValue(false);
    this.newSubUserForm.get('isAdmin').setValue(false);
    this.newSubUserForm.get('company_id').setValue(this.userData.company.id);

    this.setFormData(this.userData);
    setTimeout(() => {
      jQuery('.profile-modal').modal('show');
    }, 0);
  }

  onChangeCuenta(event: any) {
    this.userForm.get('cuentasGenerales').setValue(event);
  }

  responsableChange(formControl: any) {
    this.sharedService.responsableChange(formControl, this.userForm);
  }

  updateClientInfo({ value }: { value: User }) {
    this.userService
      .updateClientInfo(value)
      .subscribe(
        suc => this.ns.success('Perfecto!', 'Su usuario ha sido actualizado'),
        error => this.ns.error('Error!', error.error.error)
      );
  }

  updateClientCompany({ value }: { value: Client }) {
    const valueToSend = {
      ...this.userForm.getRawValue(),
      type: 'UPDATE'
    };
    this.userService
      .updateClientCompany(valueToSend)
      .subscribe(
        suc => this.ns.success('Perfecto!', 'Su compañia ha sido actualizada'),
        error => this.ns.error('Error!', error.error.error)
      );
  }
  createSubClient({ value }: { value: User }) {
    this.userService
      .createSubClient(value)
      .subscribe(suc => this.ns.success('Perfecto!', 'Su sub-cliente ha sido creado'), error => this.ns.error('Error!', error.error.error));
  }
}
