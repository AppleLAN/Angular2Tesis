import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user';
import { Client } from '../interfaces/client';

import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { NEWCHARTDATA } from './../appsModule/clients/reducers/chart.reducer';

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
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
    this.options = new RequestOptions({ headers: this.headers });
    this.chartStorage = store.select('chart');
   }

  getChartStorage(): Observable<any> {
      return this.chartStorage;
  }

  getChartData(): any {
    
    let response: any;
    let combineObs = this.getAdded().combineLatest(this.getDeleted(), 
    (added, deleted) => { 
      response = added;
      response.result.push(deleted.result[0]);
      this.store.dispatch({ type: NEWCHARTDATA, payload: response})
    });
    combineObs.subscribe();
  }

  getAdded(): Observable<any> {
    let params:any = {
      table: 'Clients',
      operation: 'cat',
      label: 'Nuevos'  
    };
    return this.http.post(
      'http://localhost:8000/api/statisticsUser', params, this.options)
        .map((response: Response) => {
          return response.json();
        })
        .catch((error: any) =>Observable.throw(error.json().error || 'Server error')
        );
  }

  getDeleted(): Observable<any> {
    let params:any = {
      table: 'Clients',
      operation: 'dat',
      label: 'Eliminados'  
    };
    return this.http.post(
      'http://localhost:8000/api/statisticsUser', params, this.options)
        .map((response: Response) => {
          return response.json();
        })
        .catch((error: any) =>Observable.throw(error.json().error || 'Server error')
        );
  }
  
}
