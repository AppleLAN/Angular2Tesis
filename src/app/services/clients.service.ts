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
  clientStorage: Observable<Client>;
  constructor(private http: Http, private store: Store<Client>) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        this.options = new RequestOptions({ headers: this.headers });
        this.clientStorage = store.select('grid');
    }
    getClientStorage(): Observable<Client> {
        return this.clientStorage;
    }

    getClients(): Observable<Client> {
        return this.http.get('http://localhost:8000/api/getClients', this.options)
            .map((response: Response) => {
                const thisResponse = response.json();
                this.store.dispatch({ type: NEWCLIENTS, payload: response.json()});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    updateClient(newClient : Client): Observable<Client> {
        return this.http.post('http://localhost:8000/api/updateClient',newClient, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGECLIENT, payload: newClient});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    addClient(newClient : Client): Observable<Client> {
        return this.http.post('http://localhost:8000/api/saveClient',newClient, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDCLIENT, payload: newClient});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    deleteClient(newClient : Client): Observable<Client> {
        return this.http.post('http://localhost:8000/api/deleteClient',newClient, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETECLIENT, payload: newClient});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }


}
