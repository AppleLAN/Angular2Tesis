import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { ClientsService } from '../../services/clients.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import { Client } from './../../interfaces/client';
import { NEWCLIENTS } from './reducers/grid.reducer';
import { CHANGECLIENT } from './reducers/grid.reducer';

import { initialModalObject } from './reducers/grid.reducer';

@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients.grid.component.html',
  styleUrls: ['./clients.component.scss']
})

export class ClientsGridComponent implements OnInit{
  clientStorage: Observable<Client>
  clients: Client;
  clientForm: FormGroup;
  error: String;
  

  constructor(
    private fb: FormBuilder, 
    private authService: UserAuthenticationService, 
    private clientsService: ClientsService, 
    private store: Store<Client>) {
  }
  ngOnInit() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      fantasyName: ['', [Validators.required,Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      place: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      adress: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
      telephone: ['', [Validators.required, Validators.minLength(9),Validators.maxLength(9)]],
      cuit: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      web: ['', [Validators.minLength(6),Validators.maxLength(30)]],
    });
    this.clientStorage = this.clientsService.getClientStorage();
    this.clientsService.getClients()
    .subscribe(
      response => {
        this.clients = response;
      },
      error =>{
        console.log(error);
      }
    );;
  } 
  
  changeInformation(client: Client) {
    this.clientForm.setValue(client);
  }

  submit({ value }: { value: Client }) {
    this.store.dispatch({ type: CHANGECLIENT, payload: value});
  }
}