import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { Stock } from '../interfaces/stock';
import { NEWSTOCK, ADDSTOCK, DELETESTOCK, CHANGESTOCK } from './../appsModule/stock/reducers/grid.reducer';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StockService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  stockStorage: Observable<Stock>;
  constructor(private http: Http, private store: Store<Stock>) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        this.options = new RequestOptions({ headers: this.headers });
        this.stockStorage = store.select('stock');
    }
    getStockStorage(): Observable<Stock> {
        return this.stockStorage;
    }

    getStock(): Observable<Stock> {
        return this.http.get('http://localhost:8000/api/getProducts', this.options)
            .map((response: Response) => {
                const thisResponse = response.json();
                this.store.dispatch({ type: NEWSTOCK, payload: response.json()});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    updateStock(newStock: Stock): Observable<Stock> {
        return this.http.post('http://localhost:8000/api/updateProducts', newStock, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGESTOCK, payload: newStock});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    addStock(newStock: Stock): Observable<Stock> {
        return this.http.post('http://localhost:8000/api/saveProducts', newStock, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDSTOCK, payload: newStock});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    deleteStock(newStock: Stock): Observable<Stock> {
        return this.http.post('http://localhost:8000/api/deleteProducts', newStock, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETESTOCK, payload: newStock});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }


}
