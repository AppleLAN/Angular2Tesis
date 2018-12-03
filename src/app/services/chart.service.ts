import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import {
  NEWCLIENTCHARTDATA,
  NEWPROVIDERCHARTDATA,
  NEWSTOCKCHARTDATA
} from '../appsModule/shared/charts/charts.reducer';

@Injectable()
export class ChartService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  chartStorage: Observable<any>;

  constructor(private store: Store<any>, private api: HttpClient) {
    this.chartStorage = store.select('chart');
  }

  private getStatistics(params: any) {
    return this.api
      .post(
        'http://ec2-54-227-227-242.compute-1.amazonaws.com/api/statisticsUser',
        params
      )
      .map((response: Response) => {
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getChartStorage(): Observable<any> {
    return this.chartStorage;
  }

  getClientsChartData(): any {
    let response: any;
    const combineObs = this.getAddedClients().combineLatest(
      this.getDeletedClients(),
      (added, deleted) => {
        response = added;
        response.result.push(deleted.result[0]);
        this.store.dispatch({ type: NEWCLIENTCHARTDATA, payload: response });
      }
    );
    combineObs.subscribe();
  }

  getProvidersChartData(): any {
    let response: any;
    const combineObs = this.getAddedProviders().combineLatest(
      this.getDeletedProviders(),
      (added, deleted) => {
        response = added;
        response.result.push(deleted.result[0]);
        this.store.dispatch({ type: NEWPROVIDERCHARTDATA, payload: response });
      }
    );
    combineObs.subscribe();
  }

  getStockChartData(): any {
    let response: any;
    const combineObs = this.getAddedStock().combineLatest(
      this.getDeletedStock(),
      (added, deleted) => {
        response = added;
        response.result.push(deleted.result[0]);
        this.store.dispatch({ type: NEWSTOCKCHARTDATA, payload: response });
      }
    );
    combineObs.subscribe();
  }

  getAddedClients(): Observable<any> {
    const params: any = {
      table: 'clients',
      operation: 'cat',
      label: 'Nuevos'
    };
    return this.getStatistics(params);
  }

  getAddedProviders(): Observable<any> {
    const params: any = {
      table: 'providers',
      operation: 'cat',
      label: 'Nuevos'
    };
    return this.getStatistics(params);
  }

  getAddedStock(): Observable<any> {
    const params: any = {
      table: 'products',
      operation: 'cat',
      label: 'Nuevos'
    };
    return this.getStatistics(params);
  }

  getDeletedClients(): Observable<any> {
    const params: any = {
      table: 'clients',
      operation: 'dat',
      label: 'Eliminados'
    };
    return this.getStatistics(params);
  }

  getDeletedProviders(): Observable<any> {
    const params: any = {
      table: 'providers',
      operation: 'dat',
      label: 'Eliminados'
    };
    return this.getStatistics(params);
  }

  getDeletedStock(): Observable<any> {
    const params: any = {
      table: 'products',
      operation: 'dat',
      label: 'Eliminados'
    };
    return this.getStatistics(params);
  }
}
