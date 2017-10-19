import { ApiClient } from '../appsModule/core/service/api';
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
  constructor(private http: Http, private store: Store<Stock>, private api: ApiClient) {
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
        return this.api.get('http://localhost:8000/api/getProducts')
            .map((response: Response) => {
                const thisResponse = response;
                this.store.dispatch({ type: NEWPRODUCT, payload: response});
                return thisResponse;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    updateProducts(newProduct: Product): Observable<Product> {
        return this.api.post('http://localhost:8000/api/updateProducts', newProduct)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGEPRODUCT, payload: newProduct});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    addProducts(newProduct: Product): Observable<Product> {
        return this.api.post('http://localhost:8000/api/saveProducts', newProduct)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDPRODUCT, payload: newProduct});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    deleteProducts(newProduct: Product): Observable<Product> {
        return this.api.post('http://localhost:8000/api/deleteProducts', newProduct)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETEPRODUCT, payload: newProduct});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getStock(product: Product): Observable<Stock> {
        return this.api.post('http://localhost:8000/api/getProductStock', product)
            .map((response: Response) => {
                const thisResponse = response;
                this.store.dispatch({ type: NEWSTOCK, payload: response});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    updateStock(newStock: Stock): Observable<Stock> {
        return this.api.post('http://localhost:8000/api/updateMovements', newStock)
            .map((response: Response) => {
                this.store.dispatch({ type: CHANGESTOCK, payload: newStock});
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    addStock(newStock: Stock): Observable<Stock> {
        return this.api.post('http://localhost:8000/api/saveMovements', newStock)
            .map((response: Response) => {
                this.store.dispatch({ type: ADDSTOCK, payload: newStock});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    deleteStock(newStock: Stock): Observable<Stock> {
        return this.api.post('http://localhost:8000/api/deleteMovements', newStock)
            .map((response: Response) => {
                this.store.dispatch({ type: DELETESTOCK, payload: newStock});
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


}
