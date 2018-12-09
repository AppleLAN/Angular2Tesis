import { NotificationsService } from 'angular2-notifications';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ClientsService } from '../../../services/clients.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NewSale, Product, SelectedStock } from '../../../interfaces/stock';
import { Client } from '../../../interfaces/client';
import { StockState } from '../../stock/reducers/grid.reducer';
import { forEach, uniqBy, isEmpty } from 'lodash';
import { SaleService } from '../services/sale.service';
import { SpinnerService } from '../../../services/spinner.service';
import { ProvidersService } from '../../../services/providers.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaleComponent implements OnInit, OnDestroy {
  saleForm: FormGroup;
  saleCart: any[];
  total = 0;
  subtotal = 0;
  subscriptions: Subscription[] = [];
  stock: StockState;
  clients: Client[];
  selectedProducts: SelectedStock = {};
  selectedProductsObserver: Subscription;
  selectedProvider: Client;
  productsToChoose: Product[];
  numberOfChanges = 0;
  isEmpty = isEmpty;
  options: any;
  selectedProduct: any;

  constructor(
    private fb: FormBuilder,
    private ss: StockService,
    private cs: ClientsService,
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
      client_id: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      paymentMethods: ['', [Validators.required]],
      saleDate: ['', [Validators.required]]
    });
    this.spinnerService.displayLoader(true);
    this.subscriptions.push(
      Observable.combineLatest(
        this.ss.getStockStorage(),
        this.cs.getClientStorage(),
        this.ps.getProviderStorage()
      ).subscribe(([stock, clients, providers]) => {
        if (stock && clients && providers) {
          this.spinnerService.displayLoader(false);
          this.saleForm.get('quantity').setValue(null);
          this.stock = stock;
          this.clients = clients;
          this.stock.products = stock.products.map(p => {
            p.providerName = providers.find(provider => provider.id === p.provider_id).name;
            return p;
          });
          if (this.selectedProduct) {
            const product = stock.products.find(p => p.id === this.selectedProduct.id);
            this.selectedProduct = product;
            this.saleForm
              .get('quantity')
              .setValidators([Validators.required, Validators.min(0), Validators.max(this.selectedProduct.stock)]);
          }
          if (stock) {
            this.productsToChoose = stock.products;
          }
        }
      })
    );
    this.subscriptions.push(this.ss.getProducts().subscribe());
    this.subscriptions.push(this.cs.getClientStorage().subscribe());
    this.subscriptions.push(
      this.sas
        .getSaleStorage()
        .flatMap(state => {
          this.spinnerService.displayLoader(true);
          return this.ss.getProducts();
        })
        .subscribe()
    );
    this.subscriptions.push(this.cs.getClients().subscribe());
    this.subscriptions.push(this.sas.getAllSales().subscribe());
  }

  onChangeProduct(p: string) {
    this.selectedProduct = this.stock.products.find(prod => prod.id === parseInt(p, 10));
    this.saleForm
      .get('quantity')
      .setValidators([Validators.required, Validators.min(0), Validators.max(this.selectedProduct.stock)]);
    this.saleForm.get('quantity').setValue(null);
  }

  addProduct() {
    const addProductResult = this.ss.addSaleProduct(
      this.stock,
      this.saleForm,
      this.clients,
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
    const deletedResult = this.ss.deleteProduct(
      providerId,
      productId,
      this.selectedProducts,
      this.total,
      this.numberOfChanges
    );
    this.selectedProducts = deletedResult.selectedProducts;
    this.total = deletedResult.total;
    this.numberOfChanges = deletedResult.numberOfChanges;
    this.ns.success('Perfecto!', 'Su producto ha sido eliminado');
  }

  sale() {
    forEach(this.selectedProducts, (value, key) => {
      const sale: NewSale = {
        newStock: value.stock,
        total: value.subTotal,
        paymentMethods: value.paymentMethods,
        client_id: parseInt(key, 10),
        saleDate: value.saleDate
      };
      this.sas.sale(sale).subscribe(
        () => {
          this.selectedProducts = null;
          this.total = null;
          this.ns.success('Perfecto!', 'Sus ventas han sido realizadas');
        },
        error => {
          this.ns.error('Error!', 'Sus ventas no han podido ser realizadas');
        }
      );
    });
  }
}
