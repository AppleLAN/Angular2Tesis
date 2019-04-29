import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Observable, Subscription } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';
import { Product, Stock } from '../../../interfaces/stock';
import { ProvidersService } from '../../../services/providers.service';
import { StockService } from '../../../services/stock.service';
import { initialModalObject, StockState } from '../reducers/grid.reducer';
import { ValidationService } from '../../../services/validation.service';
import { IvaTypes, ProducTypes } from '../../../services/shared.service';

declare var jQuery: any;

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock.modal.html',
  styleUrls: ['.././stock.component.scss']
})
export class StockModal implements OnInit {
  stockStorage: Observable<StockState>;
  productForm: FormGroup;
  error: String;
  productFormEmptyObject = initialModalObject.products[0];
  providers: Provider[];
  subscriptions: Subscription[] = [];
  options: any;
  providerId: any = null;
  ivaTypes = IvaTypes;
  producTypes = ProducTypes;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private ps: ProvidersService,
    private ns: NotificationsService,
    private vs: ValidationService
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      id: [''],
      company_id: [''],
      provider_id: ['', [Validators.required, this.vs.emptySpaceValidator]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120), this.vs.emptySpaceValidator]],
      costPrice: ['', [Validators.required, this.vs.numberValidator, this.vs.emptySpaceValidator]],
      netPrice: ['', [Validators.required, this.vs.numberValidator, this.vs.emptySpaceValidator]],
      condition: ['', [Validators.required]],
      productType: ['', [Validators.required]],
      importRight: ['', [Validators.required, this.vs.numberValidator, this.vs.emptySpaceValidator]],
      tentativeCost: ['', [Validators.required, this.vs.numberValidator, this.vs.emptySpaceValidator]],
      new: [true]
    });

    this.stockStorage = this.stockService.getStockStorage();
    this.stockService.getProducts().subscribe();
    this.ps.getProviders().subscribe();
    this.subscriptions.push(
      this.ps.getProviderStorage().subscribe(providers => {
        this.providers = providers;
      })
    );
  }

  changeInformation(stock: Stock) {
    this.productForm.reset();
    this.productForm.get('provider_id').setValue(null);
    const productForm: any = stock;
    productForm.new = false;
    this.productForm.patchValue(productForm);
    this.providerId = productForm.provider_id;
    jQuery('.ui.modal.stock-modal').modal('show');
  }

  onProviderChange(event: any) {
    this.productForm.get('provider_id').setValue(event);
  }

  onConditionChange(event: any) {
    this.productForm.get('condition').setValue(event);
  }

  onProductTypeChange(event: any) {
    this.productForm.get('productType').setValue(event);
  }

  openNewStockModal() {
    this.productForm.reset();
    this.productForm.get('provider_id').setValue(null);
    let productFormObject: any;
    productFormObject = this.productFormEmptyObject;
    productFormObject.new = true;
    this.productForm.patchValue(productFormObject);
    jQuery('.ui.modal.stock-modal').modal('show');
  }

  isNew(productForm: any) {
    if (productForm.controls.new.value) {
      return true;
    } else {
      return false;
    }
  }

  addProducts({ value }: { value: Product }) {
    this.stockService.addProducts(value).subscribe(
      suc => {
        this.ns.success('Perfecto!', 'Su producto ha sido agregado');
        jQuery('.ui.modal.stock-modal').modal('hide');
      },
      error => this.ns.error('Error!', error.error.error)
    );
  }

  updateProducts({ value }: { value: Product }) {
    this.stockService.updateProducts(value).subscribe(
      suc => {
        this.ns.success('Perfecto!', 'Su producto ha sido actualizado');
        jQuery('.ui.modal.stock-modal').modal('hide');
      },
      error => this.ns.error('Error!', error.error.error)
    );
  }

  deleteProducts({ value }: { value: Product }) {
    this.stockService.deleteProducts(value).subscribe(
      suc => {
        this.ns.success('Perfecto!', 'Su producto ha sido eliminado');
        jQuery('.ui.modal.stock-modal').modal('hide');
      },
      error => this.ns.error('Error!', error.error.error)
    );
  }
}
