import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { Observable } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
import { initialModalObject } from '../reducers/grid.reducer';
declare var jQuery: any;

@Component({
  selector: 'app-client-modal',
  templateUrl: './client.modal.html',
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
    private ns: NotificationsService) {
      this.options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      }
  }
  ngOnInit() {
    this.clientForm = this.fb.group({
      id: [''],
      company_id: [''],
      created_at: [''],
      updated_at: [''],
      deleted_at: [''],
      new: [true],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      fantasyName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      place: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      codigoPostal: ['', [Validators.minLength(4), Validators.maxLength(30)]],
      codigoProvincia: ['', [Validators.minLength(4), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      cuit: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      web: ['', [Validators.minLength(6), Validators.maxLength(30)]],
      iib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      pib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      epib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      ivaInscripto: ['', []],
      precioLista: ['', [Validators.required]],
      condicionDeVenta: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      limiteDeCredito: ['', [Validators.required]],
      numeroDeInscripcionesIB: ['', [Validators.required]],
      cuentasGenerales: ['', [Validators.required, Validators.minLength(6)]],
      percepcionDeGanancia: ['', [Validators.required]],
    });
    this.clientStorage = this.clientsService.getClientStorage();
    this.clientsService.getClients().subscribe();
  }

  changeInformation(client: Client) {
    const formClient: any = client;
    formClient.new = false;
    this.clientForm.setValue(formClient);
    jQuery('.ui.modal.client-modal').modal('show');
  }

  openNewClientModal() {
    let clientFormEmptyObject: any;
    clientFormEmptyObject = this.clientFormEmptyObject;
    clientFormEmptyObject.new = true;
    this.clientForm.setValue(this.clientFormEmptyObject);
    jQuery('.ui.modal.client-modal').modal('show');
  }

  isNew(clientForm: any) {
    if (clientForm.controls.new.value) {
      return true;
    }else {
      return false;
    }
  }

  addClient({ value }: { value: Client }) {
    this.clientsService.addClient(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su cliente ha sido agregado'),
      error => this.ns.error('Error!', error)
    );
  }

  updateClient({ value }: { value: Client }) {
    this.clientsService.updateClient(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su cliente ha sido actualizado'),
      error => this.ns.error('Error!', error)
    );
  }

   deleteClient({ value }: { value: Client }) {
    this.clientsService.deleteClient(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su cliente ha sido eliminado'),
      error => this.ns.error('Error!', error)
    );
  }
}
