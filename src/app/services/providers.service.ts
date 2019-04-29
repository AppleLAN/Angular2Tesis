import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Provider } from '../interfaces/provider';
import { NEWPROVIDERS, ADDPROVIDER, DELETEPROVIDER, CHANGEPROVIDER } from './../appsModule/providers/reducers/grid.reducer';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class ProvidersService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  providerStorage: Observable<Provider[]>;
  constructor(private store: Store<Provider>, private api: HttpClient) {
    this.providerStorage = store.select('providers');
  }
  getProviderStorage(): Observable<Provider[]> {
    return this.providerStorage;
  }

  getProviders(): Observable<Provider[]> {
    return this.api
      .get('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getProviders')
      .map((response: any) => {
        this.store.dispatch({ type: NEWPROVIDERS, payload: response });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateProvider(newProvider: Provider): Observable<Provider> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/updateProvider', newProvider)
      .map((response: Response) => {
        this.store.dispatch({ type: CHANGEPROVIDER, payload: newProvider });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addProvider(newProvider: Provider): Observable<Provider> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/saveProvider', newProvider)
      .map((response: any) => {
        this.store.dispatch({ type: ADDPROVIDER, payload: response.success });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteProvider(newProvider: Provider): Observable<Provider> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/deleteProvider', newProvider)
      .map((response: Response) => {
        this.store.dispatch({ type: DELETEPROVIDER, payload: newProvider });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
