import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Client } from '../interfaces/client';
import { NEWCLIENTS, ADDCLIENT, DELETECLIENT, CHANGECLIENT } from './../appsModule/clients/reducers/grid.reducer';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ClientsService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  clientStorage: Observable<Client[]>;
  constructor(private store: Store<Client>, private api: Http) {
        this.clientStorage = store.select('clients');
    }
    getClientStorage(): Observable<Client[]> {
        return this.clientStorage;
    }

    getClients(): Observable<Client> {
        return this.api.get('https://contaduriabackend.herokuapp.com/api/getClients')
            .map((response: Response) => {
                this.store.dispatch({ type: NEWCLIENTS, payload: response.json()});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    updateClient(newClient: Client): Observable<Client> {
        return this.api.post('https://contaduriabackend.herokuapp.com/api/updateClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGECLIENT, payload: newClient});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    addClient(newClient: Client): Observable<Client> {
        return this.api.post('https://contaduriabackend.herokuapp.com/api/saveClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDCLIENT, payload: newClient});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    deleteClient(newClient: Client): Observable<Client> {
        return this.api.post('https://contaduriabackend.herokuapp.com/api/deleteClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETECLIENT, payload: newClient});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


}
