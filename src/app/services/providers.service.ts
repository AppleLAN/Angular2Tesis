import { ApiClient } from '../appsModule/core/service/api';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
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
  providerStorage: Observable<Provider[]>;
  constructor(private store: Store<Provider>, private api: ApiClient) {
        this.providerStorage = store.select('providers');
    }
    getProviderStorage(): Observable<Provider[]> {
        return this.providerStorage;
    }

    getProviders(): Observable<Provider[]> {
        return this.api.get('https://contaduriabackend.herokuapp.com/api/getProviders')
            .map((response: Response) => {
                this.store.dispatch({ type: NEWPROVIDERS, payload: response});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    updateProvider(newProvider: Provider): Observable<Provider> {
        return this.api.post('https://contaduriabackend.herokuapp.com/api/updateProvider', newProvider)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGEPROVIDER, payload: newProvider});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    addProvider(newProvider: Provider): Observable<Provider> {
        return this.api.post('https://contaduriabackend.herokuapp.com/api/saveProvider', newProvider)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDPROVIDER, payload: newProvider});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    deleteProvider(newProvider: Provider): Observable<Provider> {
        return this.api.post('https://contaduriabackend.herokuapp.com/api/deleteProvider', newProvider)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETEPROVIDER, payload: newProvider});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


}
