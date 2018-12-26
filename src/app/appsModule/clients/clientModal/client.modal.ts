import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
import { ClientsService } from '../../../services/clients.service';
import { SharedService } from '../../../services/shared.service';
import { SpinnerService } from '../../../services/spinner.service';
import { initialModalObject } from '../reducers/grid.reducer';
import { ValidationService } from '../../../services/validation.service';
declare var jQuery: any;

@Component({
  selector: 'app-client-modal',
  templateUrl: './client.modal.html',
  styleUrls: ['.././clients.component.scss']
})
export class ClientModal implements OnInit {
  clientStorage: Observable<Client[]>;
  clients: Client;
  clientForm: FormGroup;
  error: String;
  clientFormEmptyObject = initialModalObject;
  options: any;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private ns: NotificationsService,
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
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
    this.clientForm = this.fb.group({
      id: [''],
      company_id: [''],
      new: [true],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      fantasyName: ['', [Validators.required, Validators.maxLength(30), this.vs.emptySpaceValidator]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30),
          this.vs.emptySpaceValidator
        ]
      ],
      place: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30), this.vs.emptySpaceValidator]
      ],
      codigoPostal: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.minLength(4),
          Validators.maxLength(30),
          this.vs.emptySpaceValidator
        ]
      ],
      codigoProvincia: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.min(0),
          this.vs.emptySpaceValidator
        ]
      ],
      address: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]
      ],
      telephone: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.minLength(9),
          Validators.maxLength(9),
          this.vs.emptySpaceValidator
        ]
      ],
      cuit: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.minLength(11),
          Validators.maxLength(11),
          this.vs.emptySpaceValidator
        ]
      ],
      web: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      iib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      pib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      epib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      ivaInscripto: ['', []],
      precioLista: ['', [Validators.required, Validators.min(0), Validators.maxLength(6), this.vs.emptySpaceValidator]],
      condicionDeVenta: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]
      ],
      limiteDeCredito: [
        '',
        [Validators.required, Validators.min(0), Validators.maxLength(30), this.vs.emptySpaceValidator]
      ],
      numeroDeInscripcionesIB: [
        '',
        [Validators.required, Validators.min(0), Validators.maxLength(30), this.vs.emptySpaceValidator]
      ],
      cuentasGenerales: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.min(0),
          Validators.maxLength(30),
          this.vs.emptySpaceValidator
        ]
      ],
      percepcionDeGanancia: [
        '',
        [Validators.required, Validators.min(0), Validators.maxLength(30), this.vs.emptySpaceValidator]
      ]
    });
    this.clientStorage = this.clientsService.getClientStorage();
    this.clientsService.getClients().subscribe();
  }

  changeInformation(client: Client) {
    this.clientForm.reset();
    const formClient: any = client;
    formClient.new = false;
    this.clientForm.get('fantasyName').disable();
    this.clientForm.get('cuit').disable();
    this.clientForm.patchValue(formClient);
    jQuery('.ui.modal.client-modal').modal('show');
  }

  openNewClientModal() {
    this.clientForm.reset();
    let clientFormObject: any;
    clientFormObject = this.clientFormEmptyObject;
    clientFormObject.new = true;
    this.clientForm.get('fantasyName').enable();
    this.clientForm.get('cuit').enable();
    this.clientForm.patchValue(clientFormObject);
    jQuery('.ui.modal.client-modal').modal('show');
  }

  isNew(clientForm: any) {
    if (clientForm.controls.new.value) {
      return true;
    } else {
      return false;
    }
  }

  responsableChange(formControl: any) {
    this.sharedService.responsableChange(formControl, this.clientForm);
  }

  addClient({ value }: { value: Client }) {
    this.spinnerService.displayLoader(true);
    this.clientsService.addClient(this.clientForm.getRawValue()).subscribe(
      suc => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su cliente ha sido agregado');
        jQuery('.ui.modal.client-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error.error.error);
      }
    );
  }

  updateClient({ value }: { value: Client }) {
    this.spinnerService.displayLoader(true);
    this.clientsService.updateClient(this.clientForm.getRawValue()).subscribe(
      suc => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su cliente ha sido actualizado');
        jQuery('.ui.modal.client-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error.error.error);
      }
    );
  }

  deleteClient({ value }: { value: Client }) {
    this.spinnerService.displayLoader(true);
    this.clientsService.deleteClient(this.clientForm.getRawValue()).subscribe(
      suc => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su cliente ha sido eliminado');
        jQuery('.ui.modal.client-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error.error.error);
      }
    );
  }
}
