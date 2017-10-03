import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { ClientsService } from '../../../services/clients.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { Client } from '../../../interfaces/client';
import { initialModalObject } from '../reducers/grid.reducer';
declare var jQuery: any;

@Component({
  selector: 'app-client-modal',
  templateUrl: './client.modal.html',
})

export class ClientModal implements OnInit {
  clientStorage: Observable<Client[]>
  clients: Client;
  clientForm: FormGroup;
  error: String;
  clientFormEmptyObject = initialModalObject;

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private clientsService: ClientsService,
    private store: Store<Client[]>) {
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
    this.clientsService.addClient(value).subscribe();
  }

  updateClient({ value }: { value: Client }) {
    this.clientsService.updateClient(value).subscribe();
  }

   deleteClient({ value }: { value: Client }) {
    this.clientsService.deleteClient(value).subscribe();
  }
}