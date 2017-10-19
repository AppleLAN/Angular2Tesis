import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SemanticSelectComponent } from 'ng-semantic/ng-semantic';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddedStock, NewBuy, Product, Stock } from '../../../interfaces/stock';
import { Provider } from '../../../interfaces/provider';
import { StockState } from '../../stock/reducers/grid.reducer';
import { forEach, uniqBy, orderBy  } from 'lodash';
import { SaleService } from '../services/sale.service';
declare var jQuery: any;

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
  filteredProviders: Provider[];
  selectedProducts: AddedStock[] = [];
  selectedProductsObserver: Subscription;
  selectedProvider: Provider;
  productsToChoose: Product[];

  constructor( private fb: FormBuilder,
               private ss: StockService,
               private ps: ProvidersService,
               private sas: SaleService ) { }

  ngOnInit() {
    this.saleForm = this.fb.group({
      product: ['', [Validators.required]],
      provider_id: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      typeOfBuy: ['', [Validators.required]]
    });
    this.saleForm.get('product').valueChanges.subscribe(p => {
      const filteredProducts = this.stock.products.filter(prod => prod.name === p);
      const minProductCostProviderId = orderBy(filteredProducts,'cost_price')[0].provider_id;
      const minProductCostProvider = this.providers.find(prov => prov.id === minProductCostProviderId);
      this.filteredProviders = filteredProducts.map(prod => this.providers.find(prov => prov.id === prod.provider_id));
      this.filteredProviders = this.filteredProviders.filter(prov => prov.id !== minProductCostProviderId); 
      this.filteredProviders.unshift(minProductCostProvider);
      jQuery('.provider-select').dropdown('restore defaults'); 
    });
    this.subscriptions.push(Observable.combineLatest(this.ss.getStockStorage(), this.ps.getProviderStorage()).subscribe(
        ([stock, providers])  => {
      this.stock = stock;
      this.providers = providers;
      if (stock) {
        this.productsToChoose = uniqBy(stock.products, 'name');
      }
    }));
    this.subscriptions.push(this.ss.getStateInformation().subscribe());
  this.subscriptions.push(this.ps.getProviders().subscribe());
  }

  addProduct() {
    const product = this.stock.products.find(p => {
      const works1 = p.name === this.saleForm.controls['product'].value;
      const works2 = p.provider_id === parseInt(this.saleForm.controls['provider_id'].value);
      return works1 && works2;
    });
    this.selectedProvider = this.providers.find(p => p.id === product.provider_id);
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
    this.selectedProducts = uniqBy(this.selectedProducts, (p: AddedStock) => p.product.id);
    let selectedTotal = 0;
    
    forEach(this.selectedProducts, (p: AddedStock) => { 
      const quantityPrice = p.product.sale_price * p.quantity;
      selectedTotal += quantityPrice;
    });
    this.total = selectedTotal;
  }

  ngOnDestroy() {
    forEach(this.subscriptions, (s: Subscription) => s.unsubscribe());
  }
  
  buy() {
    const buyOrder: NewBuy = {
      newStock: this.selectedProducts,
      total: this.total,
      typeOfBuy: this.saleForm.controls['typeOfBuy'].value,
      provider_id: this.saleForm.controls['provider_id'].value      
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
