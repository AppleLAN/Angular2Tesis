import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { ClientsService } from '../../../services/clients.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import { Client } from '../../../interfaces/client';

import { initialModalObject } from '../reducers/grid.reducer';

@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients.grid.component.html',
  styleUrls: ['../clients.component.scss']
})

export class ClientsGridComponent implements OnInit{
  clientStorage: Observable<Client>
  clients: Client;
  clientForm: FormGroup;
  error: String;
  clientFormEmptyObject = initialModalObject;

  constructor(
    private fb: FormBuilder, 
    private authService: UserAuthenticationService, 
    private clientsService: ClientsService, 
    private store: Store<Client>) {
  }
  ngOnInit() {
    this.clientForm = this.fb.group({
      id:[''],
      user_id:[''],
      created_at:[''],
      updated_at:[''],
      deleted_at:[''],
      new:[true],
      name: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      fantasyName: ['', [Validators.required,Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      place: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      codigoPostal: ['', [Validators.minLength(6),Validators.maxLength(30)]],
      codigoProvincia: ['', [Validators.minLength(6),Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      telephone: ['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      cuit: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      web: ['', [Validators.minLength(6),Validators.maxLength(30)]],
      iib: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      pib: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      epib: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      responsableInscripto: ['', [Validators.required]],
      excento: ['', [Validators.required]],
      responsableMonotributo: ['', [Validators.required]],
      ivaInscripto: ['', [Validators.required]],
      precioLista: ['', [Validators.required]],
      condicionDeVenta: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
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
  }

  openNewClientModal() {
    this.clientForm.setValue(this.clientFormEmptyObject)
  }

  isNew(clientForm: any) {
    if(clientForm.controls.new.value)
      return true;
    else
      return false;
  }

  addClient({ value }: { value: Client }) {
    this.clientsService.addClient(value).subscribe(
      response => {
        if (response) {
            // login successful
        } else {
            // login failed
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

  updateClient({ value }: { value: Client }) {
    this.clientsService.updateClient(value).subscribe(
      response => {
        if (response) {
            // login successful
        } else {
            // login failed
        }
      },
      error =>{
        console.log(error);
      }
    );
  }

   deleteClient({ value }: { value: Client }) {
    this.clientsService.deleteClient(value).subscribe(
      response => {
        if (response) {
            // login successful
        } else {
            // login failed
        }
      },
      error =>{
        console.log(error);
      }
    );
  }
}