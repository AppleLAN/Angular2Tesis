import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
import { ClientsService } from '../../../services/clients.service';
import { SharedService } from '../../../services/shared.service';
import { SpinnerService } from '../../../services/spinner.service';
import { initialModalObject } from '../reducers/grid.reducer';
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
    this.clientForm = this.fb.group({
      id: [''],
      company_id: [''],
      created_at: [''],
      updated_at: [''],
      deleted_at: [''],
      new: [true],
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
      precioLista: ['', [Validators.required, Validators.min(0)]],
      condicionDeVenta: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      limiteDeCredito: ['', [Validators.required, Validators.min(0)]],
      numeroDeInscripcionesIB: ['', [Validators.required, Validators.min(0)]],
      cuentasGenerales: ['', [Validators.required, Validators.minLength(6)]],
      percepcionDeGanancia: ['', [Validators.required]]
    });
    this.clientStorage = this.clientsService.getClientStorage();
    this.clientsService.getClients().subscribe();
  }

  changeInformation(client: Client) {
    this.clientForm.reset();
    const formClient: any = client;
    formClient.new = false;
    this.clientForm.setValue(formClient);
    jQuery('.ui.modal.client-modal').modal('show');
  }

  openNewClientModal() {
    this.clientForm.reset();
    let clientFormObject: any;
    clientFormObject = this.clientFormEmptyObject;
    clientFormObject.new = true;
    this.clientForm.setValue(clientFormObject);
    jQuery('.ui.modal.client-modal').modal('show');
  }

  isNew(clientForm: any) {
    if (clientForm.controls.new.value) {
      return true;
    } else {
      return false;
    }
  }

  responsableChange(formControl: FormControl) {
    this.sharedService.responsableChange(formControl, this.clientForm);
  }

  addClient({ value }: { value: Client }) {
    this.spinnerService.displayLoader(true);
    this.clientsService.addClient(value).subscribe(
      suc => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su cliente ha sido agregado');
        jQuery('.ui.modal.client-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error);
      }
    );
  }

  updateClient({ value }: { value: Client }) {
    this.spinnerService.displayLoader(true);
    this.clientsService.updateClient(value).subscribe(
      suc => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su cliente ha sido actualizado');
        jQuery('.ui.modal.client-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error);
      }
    );
  }

  deleteClient({ value }: { value: Client }) {
    this.spinnerService.displayLoader(true);
    this.clientsService.deleteClient(value).subscribe(
      suc => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su cliente ha sido eliminado');
        jQuery('.ui.modal.client-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error);
      }
    );
  }
}
