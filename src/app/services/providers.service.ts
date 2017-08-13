import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { Provider } from '../interfaces/provider';
import { NEWPROVIDERS, ADDPROVIDER, DELETEPROVIDER, CHANGEPROVIDER } from './../appsModule/providers/reducers/grid.reducer';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProvidersService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  providerStorage: Observable<Provider>;
  constructor(private http: Http, private store: Store<Provider>) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        this.options = new RequestOptions({ headers: this.headers });
        this.providerStorage = store.select('grid');
    }
    getProviderStorage(): Observable<Provider> {
        return this.providerStorage;
    }

    getProviders(): Observable<Provider> {
        return this.http.get('http://localhost:8000/api/getClients', this.options)
            .map((response: Response) => {
                const thisResponse = response.json();
                this.store.dispatch({ type: NEWPROVIDERS, payload: response.json()});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    updateProvider(newProvider : Provider): Observable<Provider> {
        return this.http.post('http://localhost:8000/api/updateClient',newProvider, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGEPROVIDER, payload: newProvider});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    addProvider(newProvider : Provider): Observable<Provider> {
        return this.http.post('http://localhost:8000/api/saveClient',newProvider, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDPROVIDER, payload: newProvider});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    deleteProvider(newProvider : Provider): Observable<Provider> {
        return this.http.post('http://localhost:8000/api/deleteClient',newProvider, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETEPROVIDER, payload: newProvider});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }


}
