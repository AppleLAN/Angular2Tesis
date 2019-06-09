import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Subscription } from 'rxjs/Rx';
import { Client } from '../../interfaces/client';
import { SharedService, DocumentTypes } from '../../services/shared.service';
import { SpinnerService } from '../../services/spinner.service';
import { UserService } from '../../services/user.service';
import { ValidationService } from '../../services/validation.service';
import { Company } from './../../interfaces/company';
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
  tipoDocumento: string;
  profileModal: any;
  documentTypes = DocumentTypes;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private spinnerService: SpinnerService,
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
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      sale_point: ['', [Validators.required, Validators.min(0), this.vs.emptySpaceValidator]],
      web: ['', [Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      cuentasGenerales: ['Cuenta Interna', []]
    });

    this.userStorage = this.userService.getUserStorage().subscribe(state => {
      this.userData = state;
      if (state) {
        this.userData.profile.password = null;
        this.userForm.patchValue(this.userData.company);
      }
    });
    this.userService.getProfileInfo().subscribe(r => {}, error => this.ns.error('Error!', error.error.error));
  }

  checkDocumentType(event: any) {
    this.sharedService.checkDocumentType(event, this.userForm);
  }

  responsableChange(formControl: any) {
    this.sharedService.responsableChange(formControl, this.userForm);
  }

  updateClientCompany({ value }: { value: Company }) {
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
          this.ns.error('Error!', error.error.error);
        }
      );
    }
  }
}
