import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SemanticSelectComponent } from 'ng-semantic/ng-semantic';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddedStock, NewBuy, Product, Stock, SelectedStock } from '../../../interfaces/stock';
import { Provider } from '../../../interfaces/provider';
import { StockState } from '../../stock/reducers/grid.reducer';
import { forEach, uniqBy, orderBy, isEmpty  } from 'lodash';
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
  total = 0;
  subtotal = 0;
  subscriptions: Subscription[] = [];
  stock: StockState;
  providers: Provider[];
  filteredProviders: Provider[];
  selectedProducts: SelectedStock = {};
  selectedProductsObserver: Subscription;
  selectedProvider: Provider;
  productsToChoose: Product[];
  isEmpty = isEmpty;
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
      const minProductCostProviderId = orderBy(filteredProducts, 'cost_price')[0].provider_id;
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
      const isTheSameProduct = p.name === this.saleForm.controls['product'].value;
      const isTheSameProvider = p.provider_id === parseInt(this.saleForm.controls['provider_id'].value);
      return isTheSameProduct && isTheSameProvider;
    });
    const selectedProvider = this.providers.find(p => p.id === product.provider_id);
    const selectedProviderId = product.provider_id;
    const addedProduct: AddedStock = {
      product: product,
      quantity: 0,
      provider: selectedProvider.name
    };
    if (this.selectedProducts[selectedProviderId]) {
      this.selectedProducts[selectedProviderId].stock = [...this.selectedProducts[selectedProviderId].stock, addedProduct];
    } else {
      this.selectedProducts[selectedProviderId] = { stock : null, subTotal: 0, typeOfBuy: this.saleForm.controls['typeOfBuy'].value };
      this.selectedProducts[selectedProviderId].stock = [addedProduct];
    }
    const selectedProduct = this.selectedProducts[selectedProviderId].stock.find( p => p.product.id === product.id);
    selectedProduct.quantity = Number(selectedProduct.quantity) + Number(this.saleForm.controls['quantity'].value);
    this.selectedProducts[selectedProviderId].stock = this.selectedProducts[selectedProviderId].stock
      .map(p => {
        if (p.product === selectedProduct.product) {
          p.quantity = selectedProduct.quantity;
        }
        return p;
      });
    this.selectedProducts[selectedProviderId].stock = uniqBy(this.selectedProducts[selectedProviderId].stock,
                                                             (p: AddedStock) => p.product.id);
    this.selectedProducts[selectedProviderId].subTotal = 0;
    this.getSubTotal(selectedProviderId);
    this.getTotal();
  }

  ngOnDestroy() {
    forEach(this.subscriptions, (s: Subscription) => s.unsubscribe());
  }

  deleteProduct(providerId: number, productId: number) {
    this.selectedProducts[providerId].stock = this.selectedProducts[providerId].stock.filter(p => p.product.id !== productId);
    if (this.selectedProducts[providerId].stock.length > 0) {
      this.getSubTotal(providerId);
    } else {
      delete this.selectedProducts[providerId];
    }
    this.getTotal();
  }

  getSubTotal(selectedProviderId: number) {
    this.selectedProducts[selectedProviderId].subTotal = 0;
    forEach(this.selectedProducts[selectedProviderId].stock, (p: AddedStock) => {
      const quantityPrice = p.product.sale_price * p.quantity;
      this.selectedProducts[selectedProviderId].subTotal += quantityPrice;
    });
  }

  getTotal() {
    this.total = 0;
    forEach(this.selectedProducts, (products, provider) => {
      this.total += products.subTotal;
    });
  }

  buy() {
    forEach(this.selectedProducts, (value, key) => {
      const buyOrder: NewBuy = {
        newStock: value.stock,
        total: this.total,
        typeOfBuy: this.saleForm.controls['typeOfBuy'].value,
        provider_id: this.saleForm.controls['provider_id'].value
      };
      this.sas.buy(buyOrder)
        .subscribe(
          error => {
            console.log(error);
          }
      );
    });
  }

}
