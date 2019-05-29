import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { forEach, uniqBy } from 'lodash';
import 'rxjs/add/operator/catch';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Client } from '../interfaces/client';
import { Provider } from '../interfaces/provider';
import { AddedBuyStock, AddedSaleStock, AddedStock, Product, SelectedStock, Stock } from '../interfaces/stock';
import {
  ADDPRODUCT,
  ADDSTOCK,
  CHANGEPRODUCT,
  CHANGESTOCK,
  DELETEPRODUCT,
  DELETESTOCK,
  NEWPRODUCT,
  NEWSTOCK,
  StockState
} from './../appsModule/stock/reducers/grid.reducer';

@Injectable()
export class StockService {
  token: string;
  headers: Headers;
  options: RequestOptions;
  stockStorage: Observable<StockState>;
  constructor(private store: Store<Stock>, private api: HttpClient) {
    this.stockStorage = store.select('stock');
  }

  getAfipCae(saleId: number): Observable<any> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getAfipCae', {
        saleId
      })
      .map((response: Response) => {
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
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
      })
      .zipAll();
  }

  getProducts(): Observable<Product[]> {
    return this.api
      .get('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getProducts')
      .map((response: Response) => {
        this.store.dispatch({ type: NEWPRODUCT, payload: response });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateProducts(newProduct: Product): Observable<Product> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/updateProducts', newProduct)
      .map((response: Response) => {
        this.store.dispatch({ type: CHANGEPRODUCT, payload: newProduct });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addProducts(newProduct: Product): Observable<Product> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/saveProducts', newProduct)
      .map((response: any) => {
        this.store.dispatch({ type: ADDPRODUCT, payload: response.success });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteProducts(newProduct: Product): Observable<Product> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/deleteProducts', newProduct)
      .map((response: Response) => {
        this.store.dispatch({ type: DELETEPRODUCT, payload: newProduct });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getStock(product: Product): Observable<Stock> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/getProductStock', product)
      .map((response: Response) => {
        this.store.dispatch({ type: NEWSTOCK, payload: response });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateStock(newStock: Stock): Observable<Stock> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/updateMovements', newStock)
      .map((response: Response) => {
        this.store.dispatch({ type: CHANGESTOCK, payload: newStock });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addStock(newStock: Stock): Observable<Stock> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/saveMovements', newStock)
      .map((response: Response) => {
        this.store.dispatch({ type: ADDSTOCK, payload: newStock });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteStock(newStock: Stock): Observable<Stock> {
    return this.api
      .post('http://ec2-54-227-227-242.compute-1.amazonaws.com/api/deleteMovements', newStock)
      .map((response: Response) => {
        this.store.dispatch({ type: DELETESTOCK, payload: newStock });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteProduct(
    providerId: number,
    productId: number,
    selectedProducts: SelectedStock,
    total: number,
    numberOfChanges: number,
    sale = false
  ) {
    selectedProducts[providerId].stock = selectedProducts[providerId].stock.filter(p => p.product.id !== productId);
    if (selectedProducts[providerId].stock.length > 0) {
      this.getSubTotal(providerId, selectedProducts, sale);
    } else {
      delete selectedProducts[providerId];
    }
    total = this.getTotal(selectedProducts);
    numberOfChanges = numberOfChanges + 1;
    return { selectedProducts, total, numberOfChanges };
  }

  getSubTotal(selectedProviderId: number, selectedProducts: SelectedStock, sale = false) {
    selectedProducts[selectedProviderId].subTotal = 0;
    forEach(selectedProducts[selectedProviderId].stock, (p: AddedStock) => {
      const quantityPrice = sale ? p.product.sale_price * p.quantity : p.product.cost_price * p.quantity;
      selectedProducts[selectedProviderId].subTotal += quantityPrice;
    });
    return selectedProducts;
  }

  getTotal(selectedProducts: SelectedStock) {
    let total = 0;
    forEach(selectedProducts, products => {
      total += products.subTotal;
    });
    return total;
  }

  addProduct(
    stock: StockState,
    saleForm: FormGroup,
    providers: Provider[],
    selectedProducts: SelectedStock,
    total: number,
    numberOfChanges: number
  ) {
    const foundProduct = stock.products.find(p => p.id === parseInt(saleForm.controls['product'].value, 10));
    const product = stock.products.find(p => {
      const isTheSameProduct = p.name === foundProduct.name;
      const isTheSameProvider = p.provider_id === parseInt(saleForm.controls['provider_id'].value, 10);
      return isTheSameProduct && isTheSameProvider;
    });
    const selectedProvider = providers.find(p => p.id === parseInt(saleForm.controls['provider_id'].value, 10));
    const addedProduct: AddedBuyStock = {
      product: product,
      quantity: 0,
      provider: selectedProvider.name
    };
    if (selectedProducts[selectedProvider.id]) {
      selectedProducts[selectedProvider.id] = {
        ...selectedProducts[selectedProvider.id],
        stock: [...selectedProducts[selectedProvider.id].stock, addedProduct],
        typeOfBuy: saleForm.controls['typeOfBuy'].value
      };
    } else {
      selectedProducts[selectedProvider.id] = {
        stock: [addedProduct],
        subTotal: 0,
        typeOfBuy: saleForm.controls['typeOfBuy'].value
      };
    }
    const selectedProduct = selectedProducts[selectedProvider.id].stock.find(p => p.product.id === product.id);
    selectedProduct.quantity = Number(selectedProduct.quantity) + Number(saleForm.controls['quantity'].value);
    selectedProducts[selectedProvider.id].stock = selectedProducts[selectedProvider.id].stock.map(p => {
      if (p.product === selectedProduct.product) {
        p.quantity = selectedProduct.quantity;
      }
      return p;
    });
    selectedProducts[selectedProvider.id].stock = uniqBy(selectedProducts[selectedProvider.id].stock, (p: AddedStock) => p.product.id);
    selectedProducts[selectedProvider.id].subTotal = 0;
    selectedProducts = this.getSubTotal(selectedProvider.id, selectedProducts);
    total = this.getTotal(selectedProducts);
    numberOfChanges = numberOfChanges + 1;
    return { selectedProducts, total, numberOfChanges };
  }

  addSaleProduct(
    stock: StockState,
    saleForm: FormGroup,
    clients: Client[],
    selectedProducts: SelectedStock,
    total: number,
    numberOfChanges: number
  ) {
    const product = stock.products.find(p => p.id === parseInt(saleForm.controls['product'].value, 10));
    const selectedClient = clients.find(c => c.id === parseInt(saleForm.controls['client_id'].value, 10));
    const addedProduct: AddedSaleStock = {
      product: product,
      quantity: 0,
      client: selectedClient.name
    };
    if (selectedProducts[selectedClient.id]) {
      selectedProducts[selectedClient.id] = {
        ...selectedProducts[selectedClient.id],
        stock: [...selectedProducts[selectedClient.id].stock, addedProduct],
        saleDate: saleForm.controls['saleDate'].value,
        paymentMethods: saleForm.controls['paymentMethods'].value
      };
    } else {
      selectedProducts[selectedClient.id] = {
        stock: [addedProduct],
        subTotal: 0,
        paymentMethods: saleForm.controls['paymentMethods'].value,
        saleDate: saleForm.controls['saleDate'].value
      };
    }
    const selectedProduct = selectedProducts[selectedClient.id].stock.find(p => p.product.id === product.id);
    selectedProduct.quantity = Number(selectedProduct.quantity) + Number(saleForm.controls['quantity'].value);
    selectedProducts[selectedClient.id].stock = selectedProducts[selectedClient.id].stock.map(p => {
      if (p.product === selectedProduct.product) {
        p.quantity = selectedProduct.quantity;
      }
      return p;
    });
    selectedProducts[selectedClient.id].stock = uniqBy(selectedProducts[selectedClient.id].stock, (p: AddedStock) => p.product.id);
    selectedProducts[selectedClient.id].subTotal = 0;
    selectedProducts = this.getSubTotal(selectedClient.id, selectedProducts, true);
    total = this.getTotal(selectedProducts);
    numberOfChanges = numberOfChanges + 1;
    return { selectedProducts, total, numberOfChanges };
  }
}
