import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { Stock, Product } from '../interfaces/stock';
import { NEWSTOCK, ADDSTOCK, DELETESTOCK, CHANGESTOCK,
    NEWPRODUCT, ADDPRODUCT, DELETEPRODUCT, CHANGEPRODUCT, StockState } from './../appsModule/stock/reducers/grid.reducer';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StockService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  stockStorage: Observable<StockState>;
  constructor(private http: Http, private store: Store<Stock>) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.headers = new Headers({ 'Authorization': 'Bearer ' + this.token });
        this.options = new RequestOptions({ headers: this.headers });
        this.stockStorage = store.select('stock');
    }
    getStockStorage(): Observable<StockState> {
        return this.stockStorage;
    }

    getStateInformation(): Observable<any> {
        return this.getProducts()
                .flatMap(products => {
                    const observableArray: Observable<any>[] = [];
                    if (products) {
                        products.forEach(p => observableArray.push(this.getStock(p)));
                    }
                    return observableArray;
                }).zipAll();
    }

    getProducts(): Observable<Product[]> {
        return this.http.get('http://localhost:8000/api/getProducts', this.options)
            .map((response: Response) => {
                const thisResponse = response.json();
                this.store.dispatch({ type: NEWPRODUCT, payload: response.json()});
                return thisResponse;
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    updateProducts(newProduct: Product): Observable<Product> {
        return this.http.post('http://localhost:8000/api/updateProducts', newProduct, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGEPRODUCT, payload: newProduct});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    addProducts(newProduct: Product): Observable<Product> {
        return this.http.post('http://localhost:8000/api/saveProducts', newProduct, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDPRODUCT, payload: newProduct});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    deleteProducts(newProduct: Product): Observable<Product> {
        return this.http.post('http://localhost:8000/api/deleteProducts', newProduct, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETEPRODUCT, payload: newProduct});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    getStock(product: Product): Observable<Stock> {
        return this.http.post('http://localhost:8000/api/getProductStock', product, this.options)
            .map((response: Response) => {
                const thisResponse = response.json();
                this.store.dispatch({ type: NEWSTOCK, payload: response.json()});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    updateStock(newStock: Stock): Observable<Stock> {
        return this.http.post('http://localhost:8000/api/updateMovements', newStock, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGESTOCK, payload: newStock});
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    addStock(newStock: Stock): Observable<Stock> {
        return this.http.post('http://localhost:8000/api/saveMovements', newStock, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDSTOCK, payload: newStock});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }

    deleteStock(newStock: Stock): Observable<Stock> {
        return this.http.post('http://localhost:8000/api/deleteMovements', newStock, this.options)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETESTOCK, payload: newStock});
                return response.json();
            })
            .catch((error: any) => Observable.throw(error.error || 'Server error'));
    }


}
