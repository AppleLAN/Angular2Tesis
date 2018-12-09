import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Order } from '../../../interfaces/order';
import { NewBuy, NewSale } from '../../../interfaces/stock';
import { CHANGEORDER, DELETEORDER, NEWORDERS, OrdersState, ADDORDER } from '../reducers/order.reducer';
import { NEWSALES, SaleState, ADDSALES } from '../reducers/sale.reducer';

@Injectable()
export class SaleService {
  orderStorage: Observable<OrdersState>;
  saleStorage: Observable<SaleState>;

  constructor(private api: HttpClient, private store: Store<OrdersState>) {
    this.orderStorage = store.select('orders');
    this.saleStorage = store.select('sales');
  }

  buy(addedProducts: NewBuy): Observable<any> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/saveBuyOrder', addedProducts)
      .flatMap((response: Response) => {
        return this.getAllOrders();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  sale(addedProducts: NewSale): Observable<any> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/createNewSale', addedProducts)
      .flatMap((response: Response) => {
        return this.getAllSales();
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
    return this.api
      .get('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getBuyOrders')
      .map((response: Response) => {
        this.store.dispatch({ type: NEWORDERS, payload: response });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getAllSales(): Observable<any> {
    return this.api
      .get('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/saleInformation')
      .map((response: Response) => {
        this.store.dispatch({ type: NEWSALES, payload: response });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteOrder(order: Order): Observable<any> {
    return this.api
      .post(`http://ec2-54-227-227-242.compute-1.amazonaws.com/api/deleteOrder`, {
        id: order.id
      })
      .map((response: Response) => {
        this.store.dispatch({ type: DELETEORDER, payload: order });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  completeOrder(order: Order): Observable<any> {
    return this.api
      .post(`http://ec2-54-227-227-242.compute-1.amazonaws.com/api/completeOrder`, {
        id: order.id
      })
      .map((response: Response) => {
        order.status = 'R';
        this.store.dispatch({ type: CHANGEORDER, payload: order });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
