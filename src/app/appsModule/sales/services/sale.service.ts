import { CHANGEORDER, DELETEORDER, NEWORDERS, OrdersState } from '../reducers/order.reducer';
import { NEWSALES, SaleState } from '../reducers/sale.reducer';

import { Order } from '../../../interfaces/order';
import { ApiClient } from '../../core/service/api';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NewBuy, NewSale } from '../../../interfaces/stock';
import { Store } from '@ngrx/store';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SaleService {
  orderStorage: Observable<OrdersState>;
  saleStorage: Observable<SaleState>;
    
  constructor(private api: ApiClient, private store: Store<OrdersState>) {
    this.orderStorage = store.select('orders');
    this.saleStorage = store.select('sales');
}
    

    buy(addedProducts: NewBuy): Observable<any> {
        return this.api.post('http://localhost:8000/api/saveBuyOrder', addedProducts)
            .map((response: Response) => {
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    sale(addedProducts: NewSale): Observable<any> {
        return this.api.post('http://localhost:8000/api/createNewSale', addedProducts)
            .map((response: Response) => {
                return response;
            })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getSaleStorage(): Observable<SaleState> {
        return this.saleStorage;
    }

    getOrderStorage(): Observable<OrdersState> {
        return this.orderStorage;
    }
    
    getAllOrders(): Observable<any> {
        return this.api.get('http://localhost:8000/api/getBuyOrders')
        .map((response: Response) => {
            this.store.dispatch({ type: NEWORDERS, payload: response});
            return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    getAllSales(): Observable<any> {
        return this.api.get('http://localhost:8000/api/saleInformation')
        .map((response: Response) => {
            this.store.dispatch({ type: NEWSALES, payload: response});
            return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    deleteOrder(order: Order): Observable<any> {
        return this.api.post(`http://localhost:8000/api/deleteOrder/${order.id}`)
        .map((response: Response) => {
            this.store.dispatch({ type: DELETEORDER, payload: order});            
            return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    completeOrder(order: Order): Observable<any> {
        return this.api.post(`http://localhost:8000/api/completeOrder/${order.id}`)
        .map((response: Response) => {
            order.status = 'R';
            this.store.dispatch({ type: CHANGEORDER, payload: order});                        
            return response;
        })
        .catch((error: any) => Observable.throw(error || 'Server error'));
    }


}
