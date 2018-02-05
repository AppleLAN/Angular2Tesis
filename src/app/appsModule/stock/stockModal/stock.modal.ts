import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Provider } from '../../../interfaces/provider';
import { StockService } from '../../../services/stock.service';
import { ProvidersService } from '../../../services/providers.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Stock, Product } from '../../../interfaces/stock';
import { initialModalObject, StockState } from '../reducers/grid.reducer';
import { NotificationsService } from 'angular2-notifications';

declare var jQuery: any;

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock.modal.html',
})

export class StockModal implements OnInit {
  stockStorage: Observable<StockState>;
  productForm: FormGroup;
  error: String;
  productFormEmptyObject = initialModalObject.products[0];
  providers: Provider[];
  subscriptions: Subscription[] = [];
  options: any;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private ps: ProvidersService,
    private ns: NotificationsService) {
      this.options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      }
  }
  ngOnInit() {
    this.productForm = this.fb.group({
      id: [''],
      company_id: [''],
      provider_id: ['',[Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      cost_price: ['', [Validators.required]],
      sale_price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      created_at: [''],
      updated_at: [''],
      deleted_at: [''],
      quantity: [''],
      new: [true]
    });

    this.stockStorage = this.stockService.getStockStorage();
    this.stockService.getStateInformation().subscribe();
    this.ps.getProviders().subscribe();
    this.subscriptions.push(this.ps.getProviderStorage().subscribe((providers)  => {
      this.providers = providers;
    }));
  }

  changeInformation(stock: Stock) {
    const productForm: any = stock;
    productForm.new = false;
    this.productForm.setValue(productForm);
    jQuery('.ui.modal.stock-modal').modal('show');
  }

  openNewStockModal() {
    let productFormEmptyObject: any;
    productFormEmptyObject = this.productFormEmptyObject;
    productFormEmptyObject.new = true;
    this.productForm.setValue(productFormEmptyObject);
    jQuery('.ui.modal.stock-modal').modal('show');
  }

  refresh() {
    jQuery('.ui.modal.profile-modal').modal('refresh');
  }

  isNew(productForm: any) {
    if (productForm.controls.new.value) {
        return true;
    }else {
      return false;
    }
  }

  addProducts({ value }: { value: Product }) {
    this.stockService.addProducts(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su producto a sido agregado'),
      error => this.ns.error('Error!',error)
    );
    // this.addStock(value);
  }

  updateProducts({ value }: { value: Product }) {
    this.stockService.updateProducts(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su producto a sido actualizado'),
      error => this.ns.error('Error!',error)
    );
    // this.updateStock(value);
  }

  deleteProducts({ value }: { value: Product }) {
    this.stockService.deleteProducts(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su producto a sido eliminado'),
      error => this.ns.error('Error!',error)
    );
    // this.deleteStock(value);
  }

  addStock({ value }: { value: Stock }) {
    this.stockService.addStock(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su producto a sido agregado al stock'),
      error => this.ns.error('Error!',error)
    );
  }

  updateStock({ value }: { value: Stock }) {
    this.stockService.updateStock(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su stock a sido actualizado'),
      error => this.ns.error('Error!',error)
    );
  }

  deleteStock({ value }: { value: Stock }) {
    this.stockService.deleteStock(value).subscribe(
      suc => this.ns.success('Perfecto!', 'Su stock a sido eliminado'),
      error => this.ns.error('Error!',error)
    );
  }
}
