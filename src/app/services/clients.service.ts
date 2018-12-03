import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Client } from '../interfaces/client';
import { ADDCLIENT, CHANGECLIENT, DELETECLIENT, NEWCLIENTS } from './../appsModule/clients/reducers/grid.reducer';


@Injectable()
export class ClientsService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  clientStorage: Observable<Client[]>;
  constructor(private store: Store<Client>, private api: HttpClient) {
        this.clientStorage = store.select('clients');
    }
    getClientStorage(): Observable<Client[]> {
        return this.clientStorage;
    }

    getClients(): Observable<Client> {
        return this.api.get('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getClients')
            .map((response: Response) => {
                this.store.dispatch({ type: NEWCLIENTS, payload: response});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    updateClient(newClient: Client): Observable<Client> {
        return this.api.post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/updateClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGECLIENT, payload: newClient});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    addClient(newClient: Client): Observable<Client> {
        return this.api.post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/saveClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDCLIENT, payload: newClient});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    deleteClient(newClient: Client): Observable<Client> {
        return this.api.post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/deleteClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETECLIENT, payload: newClient});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


}
