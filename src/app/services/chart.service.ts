import { ApiClient } from '../appsModule/core/service/api';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
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
  constructor(private store: Store<any>, private api: ApiClient) {  
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

  getStockChartData(): any {
    let response: any;
    const combineObs = this.getAddedStock().combineLatest(this.getDeletedStock(),
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
    return this.api.post(
      'https://contaduriabackend.herokuapp.com/api/statisticsUser', params)
        .map((response: Response) => {
          return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error')
        );
  }

  getAddedProviders(): Observable<any> {
    const params: any = {
      table: 'Providers',
      operation: 'cat',
      label: 'Nuevos'
    };
    return this.api.post(
      'https://contaduriabackend.herokuapp.com/api/statisticsUser', params)
        .map((response: Response) => {
          return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error')
        );
  }

  getAddedStock(): Observable<any> {
    const params: any = {
      table: 'Providers',
      operation: 'cat',
      label: 'Nuevos'
    };
    return this.api.post(
      'https://contaduriabackend.herokuapp.com/api/statisticsUser', params)
        .map((response: Response) => {
          return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error')
        );
  }

  getDeletedClients(): Observable<any> {
    const params: any = {
      table: 'Clients',
      operation: 'dat',
      label: 'Eliminados'
    };
    return this.api.post(
      'https://contaduriabackend.herokuapp.com/api/statisticsUser', params)
        .map((response: Response) => {
          return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error')
        );
  }

  getDeletedProviders(): Observable<any> {
    const params: any = {
      table: 'Providers',
      operation: 'dat',
      label: 'Eliminados'
    };
    return this.api.post(
      'https://contaduriabackend.herokuapp.com/api/statisticsUser', params)
        .map((response: Response) => {
          return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error')
        );
  }

  getDeletedStock(): Observable<any> {
    const params: any = {
      table: 'Providers',
      operation: 'dat',
      label: 'Eliminados'
    };
    return this.api.post(
      'https://contaduriabackend.herokuapp.com/api/statisticsUser', params)
        .map((response: Response) => {
          return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error')
        );
  }

}
