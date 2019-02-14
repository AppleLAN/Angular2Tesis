import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { forEach, isEmpty, orderBy, uniqBy } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Provider } from '../../../interfaces/provider';
import { NewBuy, Product, SelectedStock } from '../../../interfaces/stock';
import { ProvidersService } from '../../../services/providers.service';
import { SpinnerService } from '../../../services/spinner.service';
import { StockService } from '../../../services/stock.service';
import { StockState } from '../../stock/reducers/grid.reducer';
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
  selectedProduct: any;

  constructor(
    private fb: FormBuilder,
    private ss: StockService,
    private ps: ProvidersService,
    private sas: SaleService,
    private ns: NotificationsService,
    private spinnerService: SpinnerService
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    this.saleForm = this.fb.group({
      product: ['', [Validators.required]],
      provider_id: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      typeOfBuy: ['', [Validators.required]]
    });

    this.spinnerService.displayLoader(true);
    this.subscriptions.push(
      Observable.combineLatest(this.ss.getStockStorage(), this.ps.getProviderStorage()).subscribe(([stock, providers]) => {
        if (stock && providers) {
          this.spinnerService.displayLoader(false);
          this.stock = stock;
          this.stock.products = stock.products.map(p => {
            const foundProvider = providers.find(provider => provider.id === p.provider_id);
            p.providerName = foundProvider ? foundProvider.name : null;
            return p;
          });
          this.providers = providers;
          if (stock) {
            this.productsToChoose = uniqBy(stock.products, 'name');
            this.productsToChoose = orderBy(this.productsToChoose, 'name');
          }
        }
      })
    );
    this.subscriptions.push(this.ss.getProducts().subscribe());
    this.subscriptions.push(this.ps.getProviders().subscribe());
    this.subscriptions.push(this.sas.getAllOrders().subscribe());
  }

  onChangeProduct(p: string) {
    this.selectedProduct = this.stock.products.find(prod => prod.id === parseInt(p, 10));
    const filteredProducts = this.stock.products.filter(prod => prod.name === this.selectedProduct.name);
    const minProductCostProviderId = orderBy(filteredProducts, 'cost_price')[0].provider_id;
    const minProductCostProvider = this.providers.find(prov => prov.id === minProductCostProviderId);
    this.filteredProviders = filteredProducts.map(prod => this.providers.find(prov => prov.id === prod.provider_id));
    this.filteredProviders = this.filteredProviders.filter(prov => prov.id !== minProductCostProviderId);
    this.filteredProviders.unshift(minProductCostProvider);
    jQuery('.provider-select').dropdown('restore defaults');
  }

  onChangeProvider(p: string) {
    if (p) {
      const product = this.stock.products.find(
        (prod: Product) => prod.id === parseInt(this.saleForm.get('product').value, 10) && prod.provider_id === parseInt(p, 10)
      );
      this.selectedProduct = product;
    }
  }

  addProduct() {
    const addProductResult = this.ss.addProduct(
      this.stock,
      this.saleForm,
      this.providers,
      this.selectedProducts,
      this.total,
      this.numberOfChanges
    );
    this.selectedProducts = addProductResult.selectedProducts;
    this.total = addProductResult.total;
    this.numberOfChanges = addProductResult.numberOfChanges;
    this.ns.success('Perfecto!', 'Su producto ha sido agregado debajo');
  }

  ngOnDestroy() {
    forEach(this.subscriptions, (s: Subscription) => s.unsubscribe());
  }

  deleteProduct(providerId: number, productId: number) {
    const deletedResult = this.ss.deleteProduct(providerId, productId, this.selectedProducts, this.total, this.numberOfChanges);
    this.selectedProducts = deletedResult.selectedProducts;
    this.total = deletedResult.total;
    this.numberOfChanges = deletedResult.numberOfChanges;
    this.ns.success('Perfecto!', 'Su producto ha sido eliminado');
  }

  buy() {
    forEach(this.selectedProducts, (value, key) => {
      const typeOfBuy = value.typeOfBuy.includes('Efectivo') ? 'E' : 'C';
      const buyOrder: NewBuy = {
        newStock: value.stock,
        total: value.subTotal,
        typeOfBuy: typeOfBuy,
        provider_id: Number(key)
      };
      this.spinnerService.displayLoader(true);
      this.subscriptions.push(
        this.sas.buy(buyOrder).subscribe(
          () => {
            this.spinnerService.displayLoader(false);
            this.ns.success('Perfecto!', 'Sus ordenes han sido realizadas');
          },
          error => {
            this.spinnerService.displayLoader(false);
            this.ns.error('Error!', 'Sus ordenes no han podido ser realizadas');
          }
        )
      );
    });
  }
}
