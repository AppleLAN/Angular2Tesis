import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user';
import { Client } from '../interfaces/client';

import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { NEWCLIENTCHARTDATA } from './../appsModule/clients/reducers/chart.reducer';
import { NEWPROVIDERCHARTDATA } from './../appsModule/providers/reducers/chart.reducer';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChartService {
  token: string;
  headers: Headers;
  options: RequestOptions
  chartStorage: Observable<any>;
;
  constructor(private http: Http,  private store: Store<any>) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    this.options = new RequestOptions({ headers: this.headers });
    this.chartStorage = store.select('chart');
   }

  getChartStorage(): Observable<any> {
      return this.chartStorage;
  }

  getClientsChartData(): any {
    let response: any;
    const combineObs = this.getAddedClients().combineLatest(this.getDeletedClients(),
    (added, deleted) => {
      response = added;
      response.result.push(deleted.result[0]);
      this.store.dispatch({ type: NEWCLIENTCHARTDATA, payload: response})
    });
    combineObs.subscribe();
  }

  getProvidersChartData(): any {
    let response: any;
    const combineObs = this.getAddedProviders().combineLatest(this.getDeletedProviders(),
    (added, deleted) => {
      response = added;
      response.result.push(deleted.result[0]);
      this.store.dispatch({ type: NEWPROVIDERCHARTDATA, payload: response})
    });
    combineObs.subscribe();
  }

  getAddedClients(): Observable<any> {
    const params: any = {
      table: 'Clients',
      operation: 'cat',
      label: 'Nuevos'
    };
    return this.http.post(
      'http://localhost:8000/api/statisticsUser', params, this.options)
        .map((response: Response) => {
          return response.json();
        })
        .catch((error: any) => Observable.throw(error.error || 'Server error')
        );
  }

  getAddedProviders(): Observable<any> {
    const params: any = {
      table: 'Providers',
      operation: 'cat',
      label: 'Nuevos'
    };
    return this.http.post(
      'http://localhost:8000/api/statisticsUser', params, this.options)
        .map((response: Response) => {
          return response.json();
        })
        .catch((error: any) => Observable.throw(error.error || 'Server error')
        );
  }

  getDeletedClients(): Observable<any> {
    const params: any = {
      table: 'Clients',
      operation: 'dat',
      label: 'Eliminados'
    };
    return this.http.post(
      'http://localhost:8000/api/statisticsUser', params, this.options)
        .map((response: Response) => {
          return response.json();
        })
        .catch((error: any) => Observable.throw(error.error || 'Server error')
        );
  }

  getDeletedProviders(): Observable<any> {
    const params: any = {
      table: 'Providers',
      operation: 'dat',
      label: 'Eliminados'
    };
    return this.http.post(
      'http://localhost:8000/api/statisticsUser', params, this.options)
        .map((response: Response) => {
          return response.json();
        })
        .catch((error: any) => Observable.throw(error.error || 'Server error')
        );
  }

}
