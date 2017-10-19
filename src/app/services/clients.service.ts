import { ApiClient } from '../appsModule/core/service/api';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
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
  constructor(private http: Http, private store: Store<Client>, private api: ApiClient) {
        this.clientStorage = store.select('clients');
    }
    getClientStorage(): Observable<Client[]> {
        return this.clientStorage;
    }

    getClients(): Observable<Client> {
        return this.api.get('http://localhost:8000/api/getClients')
            .map((response: Response) => {
                const thisResponse = response;
                this.store.dispatch({ type: NEWCLIENTS, payload: response});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    updateClient(newClient: Client): Observable<Client> {
        return this.api.post('http://localhost:8000/api/updateClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGECLIENT, payload: newClient});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    addClient(newClient: Client): Observable<Client> {
        return this.api.post('http://localhost:8000/api/saveClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDCLIENT, payload: newClient});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    deleteClient(newClient: Client): Observable<Client> {
        return this.api.post('http://localhost:8000/api/deleteClient', newClient)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETECLIENT, payload: newClient});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


}
