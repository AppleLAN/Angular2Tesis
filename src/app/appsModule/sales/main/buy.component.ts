import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddedStock, NewBuy, Product, Stock } from '../../../interfaces/stock';
import { Provider } from '../../../interfaces/provider';
import { StockState } from '../../stock/reducers/grid.reducer';
import { forEach, uniqBy } from 'lodash';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BuyComponent implements OnInit, OnDestroy {
  saleForm: FormGroup;
  saleCart: any[];
  total: number = 0;
  subtotal: number = 0;
  subscriptions: Subscription[] = [];
  stock: StockState;
  providers: Provider[];
  selectedProducts: AddedStock[] = [];
  selectedProductsObserver: Subscription;

  constructor( private fb: FormBuilder,
               private ss: StockService,
               private cs: ProvidersService,
               private sas: SaleService ) { }

  ngOnInit() {
    this.saleForm = this.fb.group({
      product: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      invoiceType: ['', [Validators.required]],
      typeOfBuy: ['', [Validators.required]]
    });
    this.subscriptions.push(Observable.combineLatest(this.ss.getStockStorage(), this.cs.getProviderStorage()).subscribe(
        ([stock, providers])  => {
      this.stock = stock;
      this.providers = providers;
    }));
    this.subscriptions.push(this.ss.getStateInformation().subscribe());
    this.subscriptions.push(this.cs.getProviders().subscribe());
  }

  addProduct() {
    const product: Product = this.stock.products.find(p => p.name === this.saleForm.controls['product'].value);
    const addedProduct: AddedStock = {
      product: product,
      quantity: 0
    }
    this.selectedProducts.push(addedProduct);  
    let selectedProduct = this.selectedProducts.find( p => p.product.id === product.id);
    selectedProduct.quantity = Number(selectedProduct.quantity) + Number(this.saleForm.controls['quantity'].value);
    this.selectedProducts = this.selectedProducts
      .map(p => {
        if (p.product === selectedProduct.product) {
          p.quantity = selectedProduct.quantity;
        } 
        return p;
      });
    this.selectedProducts = uniqBy(this.selectedProducts, p => p.product.id);
    let selectedTotal = 0;
    
    forEach(this.selectedProducts, p => { 
      const quantityPrice = p.product.sale_price * p.quantity;
      selectedTotal += quantityPrice;
    });
    this.total = selectedTotal;
  }

  ngOnDestroy() {
    forEach(this.subscriptions, s => s.unsubscribe());
  }
  
  buy() {
    const buyOrder: NewBuy = {
      newStock: this.selectedProducts,
      total: this.total,
      invoiceType: this.saleForm.controls['invoiceType'].value,
      typeOfBuy: this.saleForm.controls['typeOfBuy'].value,
      provider: this.providers.find(p => p.name ===this.saleForm.controls['provider'].value).id      
    }
    this.sas.buy(buyOrder)
      .subscribe(
        response => {
          if (response) {
              // successful
              
          } else {
              // failed
          }
        },
        error =>{
          console.log(error);
        }
    );
  }

}
