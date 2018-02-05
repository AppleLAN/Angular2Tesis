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
import { forEach, uniqBy, isEmpty  } from 'lodash';
import { SaleService } from '../services/sale.service';

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

  constructor( private fb: FormBuilder,
               private ss: StockService,
               private cs: ClientsService,
               private sas: SaleService,
               private ns: NotificationsService) { 
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
      client_id: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      paymentMethods: ['', [Validators.required]],
      saleDate: ['',[Validators.required]]
    });
    this.subscriptions.push(Observable.combineLatest(this.ss.getStockStorage(), this.cs.getClientStorage()).subscribe(
        ([stock, clients])  => {
      this.stock = stock;
      this.clients = clients;
      if (stock) {
        this.productsToChoose = uniqBy(stock.products, 'name');
      }
    }));
    this.subscriptions.push(this.ss.getStateInformation().subscribe());
    this.subscriptions.push(this.cs.getClientStorage().subscribe());
    this.subscriptions.push(this.cs.getClients().subscribe());
  }

  addProduct() {
    const addProductResult = this.ss.addSaleProduct(this.stock, this.saleForm, this.clients, this.selectedProducts, this.total, this.numberOfChanges);
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
    this.ns.success('Perfecto!', 'Su producto a sido eliminado');
  }
  
  sale() {
    forEach(this.selectedProducts, (value, key) => {
      const sale: NewSale = {
        newStock: value.stock,
        total: value.subTotal,
        paymentMethods: value.paymentMethods,
        client_id: parseInt(key),
        saleDate: value.saleDate
      };
      this.sas.sale(sale)
        .subscribe(
          () => this.ns.success('Perfecto!', 'Sus ventas han sido realizadas'),          
          error => {
            this.ns.error('Error!', 'Sus ventas no han podido ser realizadas')         
          }
      );
    });
  }

}
