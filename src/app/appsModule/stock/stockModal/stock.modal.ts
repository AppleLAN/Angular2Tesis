import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { StockService } from '../../../services/stock.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { Stock, Product } from '../../../interfaces/stock';
import { initialModalObject, State } from '../reducers/grid.reducer';
declare var jQuery: any;

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock.modal.html',
})

export class StockModal implements OnInit {
  stockStorage: Observable<State>;
  productForm: FormGroup;
  error: String;
  productFormEmptyObject = initialModalObject.products[0];

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private stockService: StockService,
    private store: Store<State>) {
  }
  ngOnInit() {
    this.productForm = this.fb.group({
      id: [''],
      company_id: [''],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(120)]],
      cost_price: ['', [Validators.required]],
      sale_price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      created_at: [''],
      updated_at: [''],
      deleted_at: [''],
      new: [true],
      quantity: ['', [Validators.required]]
    });

    this.stockStorage = this.stockService.getStockStorage();
    this.stockService.getStateInformation().subscribe();
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
    this.stockService.addProducts(value).subscribe();
    // this.addStock(value);
  }

  updateProducts({ value }: { value: Product }) {
    this.stockService.updateProducts(value).subscribe();
    // this.updateStock(value);
  }

  deleteProducts({ value }: { value: Product }) {
    this.stockService.deleteProducts(value).subscribe();
    // this.deleteStock(value);
  }

  addStock({ value }: { value: Stock }) {
    this.stockService.addStock(value).subscribe();
  }

  updateStock({ value }: { value: Stock }) {
    this.stockService.updateStock(value).subscribe();
  }

  deleteStock({ value }: { value: Stock }) {
    this.stockService.deleteStock(value).subscribe();
  }
}
