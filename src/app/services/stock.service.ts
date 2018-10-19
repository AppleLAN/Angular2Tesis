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
import {
  AddedBuyStock,
  AddedSaleStock,
  AddedStock,
  Product,
  SelectedStock,
  Stock
} from '../interfaces/stock';
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
      .post('https://contaduriabackend.herokuapp.com/api/getAfipCae', {
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
      .get('https://contaduriabackend.herokuapp.com/api/getProducts')
      .map((response: Response) => {
        this.store.dispatch({ type: NEWPRODUCT, payload: response });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateProducts(newProduct: Product): Observable<Product> {
    return this.api
      .post(
        'https://contaduriabackend.herokuapp.com/api/updateProducts',
        newProduct
      )
      .map((response: Response) => {
        this.store.dispatch({ type: CHANGEPRODUCT, payload: newProduct });
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addProducts(newProduct: Product): Observable<Product> {
    return this.api
      .post(
        'https://contaduriabackend.herokuapp.com/api/saveProducts',
        newProduct
      )
      .map((response: Response) => {
        this.store.dispatch({ type: ADDPRODUCT, payload: newProduct });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteProducts(newProduct: Product): Observable<Product> {
    return this.api
      .post(
        'https://contaduriabackend.herokuapp.com/api/deleteProducts',
        newProduct
      )
      .map((response: Response) => {
        this.store.dispatch({ type: DELETEPRODUCT, payload: newProduct });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getStock(product: Product): Observable<Stock> {
    return this.api
      .post(
        'https://contaduriabackend.herokuapp.com/api/getProductStock',
        product
      )
      .map((response: Response) => {
        this.store.dispatch({ type: NEWSTOCK, payload: response });
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  updateStock(newStock: Stock): Observable<Stock> {
    return this.api
      .post(
        'https://contaduriabackend.herokuapp.com/api/updateMovements',
        newStock
      )
      .map((response: Response) => {
        this.store.dispatch({ type: CHANGESTOCK, payload: newStock });
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  addStock(newStock: Stock): Observable<Stock> {
    return this.api
      .post(
        'https://contaduriabackend.herokuapp.com/api/saveMovements',
        newStock
      )
      .map((response: Response) => {
        this.store.dispatch({ type: ADDSTOCK, payload: newStock });
        return response;
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  deleteStock(newStock: Stock): Observable<Stock> {
    return this.api
      .post(
        'https://contaduriabackend.herokuapp.com/api/deleteMovements',
        newStock
      )
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
    numberOfChanges: number
  ) {
    selectedProducts[providerId].stock = selectedProducts[
      providerId
    ].stock.filter(p => p.product.id !== productId);
    if (selectedProducts[providerId].stock.length > 0) {
      this.getSubTotal(providerId, selectedProducts);
    } else {
      delete selectedProducts[providerId];
    }
    total = this.getTotal(selectedProducts);
    numberOfChanges = numberOfChanges + 1;
    return { selectedProducts, total, numberOfChanges };
  }

  getSubTotal(selectedProviderId: number, selectedProducts: SelectedStock) {
    selectedProducts[selectedProviderId].subTotal = 0;
    forEach(selectedProducts[selectedProviderId].stock, (p: AddedStock) => {
      const quantityPrice = p.product.sale_price * p.quantity;
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
    const product = stock.products.find(p => {
      const isTheSameProduct = p.name === saleForm.controls['product'].value;
      const isTheSameProvider =
        p.provider_id === parseInt(saleForm.controls['provider_id'].value);
      return isTheSameProduct && isTheSameProvider;
    });
    const selectedProvider = providers.find(p => p.id === product.provider_id);
    const selectedProviderId = product.provider_id;
    const addedProduct: AddedBuyStock = {
      product: product,
      quantity: 0,
      provider: selectedProvider.name
    };
    if (selectedProducts[selectedProviderId]) {
      selectedProducts[selectedProviderId].stock = [
        ...selectedProducts[selectedProviderId].stock,
        addedProduct
      ];
    } else {
      selectedProducts[selectedProviderId] = {
        stock: null,
        subTotal: 0,
        typeOfBuy: saleForm.controls['typeOfBuy'].value
      };
      selectedProducts[selectedProviderId].stock = [addedProduct];
    }
    const selectedProduct = selectedProducts[selectedProviderId].stock.find(
      p => p.product.id === product.id
    );
    selectedProduct.quantity =
      Number(selectedProduct.quantity) +
      Number(saleForm.controls['quantity'].value);
    selectedProducts[selectedProviderId].stock = selectedProducts[
      selectedProviderId
    ].stock.map(p => {
      if (p.product === selectedProduct.product) {
        p.quantity = selectedProduct.quantity;
      }
      return p;
    });
    selectedProducts[selectedProviderId].stock = uniqBy(
      selectedProducts[selectedProviderId].stock,
      (p: AddedStock) => p.product.id
    );
    selectedProducts[selectedProviderId].subTotal = 0;
    selectedProducts = this.getSubTotal(selectedProviderId, selectedProducts);
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
    const product = stock.products.find(
      p => p.name === saleForm.controls['product'].value
    );
    const selectedClient = clients.find(
      c => c.id === Number(saleForm.controls['client_id'].value)
    );
    const addedProduct: AddedSaleStock = {
      product: product,
      quantity: 0,
      client: selectedClient.name
    };
    if (selectedProducts[selectedClient.id]) {
      selectedProducts[selectedClient.id].stock = [
        ...selectedProducts[selectedClient.id].stock,
        addedProduct
      ];
      selectedProducts[selectedClient.id].saleDate =
        saleForm.controls['saleDate'].value;
    } else {
      selectedProducts[selectedClient.id] = {
        stock: null,
        subTotal: 0,
        paymentMethods: saleForm.controls['paymentMethods'].value,
        saleDate: saleForm.controls['saleDate'].value
      };
      selectedProducts[selectedClient.id].stock = [addedProduct];
    }
    const selectedProduct = selectedProducts[selectedClient.id].stock.find(
      p => p.product.id === product.id
    );
    selectedProduct.quantity =
      Number(selectedProduct.quantity) +
      Number(saleForm.controls['quantity'].value);
    selectedProducts[selectedClient.id].stock = selectedProducts[
      selectedClient.id
    ].stock.map(p => {
      if (p.product === selectedProduct.product) {
        p.quantity = selectedProduct.quantity;
      }
      return p;
    });
    selectedProducts[selectedClient.id].stock = uniqBy(
      selectedProducts[selectedClient.id].stock,
      (p: AddedStock) => p.product.id
    );
    selectedProducts[selectedClient.id].subTotal = 0;
    selectedProducts = this.getSubTotal(selectedClient.id, selectedProducts);
    total = this.getTotal(selectedProducts);
    numberOfChanges = numberOfChanges + 1;
    return { selectedProducts, total, numberOfChanges };
  }
}
