import { NotificationsService } from 'angular2-notifications';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NewBuy, Product, SelectedStock } from '../../../interfaces/stock';
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
  numberOfChanges = 0;
  isEmpty = isEmpty;
  options: any;

  constructor( private fb: FormBuilder,
               private ss: StockService,
               private ps: ProvidersService,
               private sas: SaleService,
               private ns: NotificationsService ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    }
  }

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
    this.subscriptions.push(this.ss.getProducts().subscribe());
    this.subscriptions.push(this.ps.getProviders().subscribe());
  }

  addProduct() {
    const addProductResult = this.ss.addProduct(this.stock, this.saleForm, this.providers, this.selectedProducts, this.total, this.numberOfChanges);
    this.selectedProducts = addProductResult.selectedProducts;
    this.total = addProductResult.total;
    this.numberOfChanges = addProductResult.numberOfChanges;
    this.ns.success('Perfecto!', 'Su producto a sido agregado debajo');
  }

  ngOnDestroy() {
    forEach(this.subscriptions, (s: Subscription) => s.unsubscribe());
  }
  
  deleteProduct(providerId: number, productId: number) {
    const deletedResult = this.ss.deleteProduct(providerId, productId, this.selectedProducts, this.total, this.numberOfChanges)
    this.selectedProducts = deletedResult.selectedProducts;
    this.total = deletedResult.total;
    this.numberOfChanges = deletedResult.numberOfChanges;
    this.ns.success('Perfecto!', 'Su producto a sido agregado eliminado');
  }
  
  buy() {
    forEach(this.selectedProducts, (value, key) => {
      const buyOrder: NewBuy = {
        newStock: value.stock,
        total: value.subTotal,
        typeOfBuy: value.typeOfBuy,
        provider_id: parseInt(key)
      };
      this.sas.buy(buyOrder)
        .subscribe(
          () => this.ns.success('Perfecto!', 'Sus ordenes han sido realizadas'),                    
          error => {
            this.ns.error('Error!', 'Sus ordenes no han podido ser realizadas')         
          }
      );
    });
  }

}
