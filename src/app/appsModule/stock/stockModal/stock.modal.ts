import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { StockService } from '../../../services/stock.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { Stock } from '../../../interfaces/stock';
import { initialModalObject } from '../reducers/grid.reducer';
declare var jQuery: any;

@Component({
  selector: 'app-stock-modal',
  templateUrl: './stock.modal.html',
})

export class StockModal implements OnInit {
  stockStorage: Observable<Stock>
  stock: Stock;
  stockForm: FormGroup;
  error: String;
  stockFormEmptyObject = initialModalObject;

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthenticationService,
    private stockService: StockService,
    private store: Store<Stock>) {
  }
  ngOnInit() {
    this.stockForm = this.fb.group({
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
      new: [true]
    });
    this.stockStorage = this.stockService.getStockStorage();
    this.stockService.getStock().subscribe();
  }

  changeInformation(stock: Stock) {
    const formStock: any = stock;
    formStock.new = false;
    this.stockForm.setValue(formStock);
    jQuery('.ui.modal.stock-modal').modal('show');
  }

  openNewStockModal() {
    let stockFormEmptyObject: any;
    stockFormEmptyObject = this.stockFormEmptyObject;
    stockFormEmptyObject.new = true;
    this.stockForm.setValue(this.stockFormEmptyObject);
    jQuery('.ui.modal.stock-modal').modal('show');
  }

  isNew(stockForm: any) {
    if (stockForm.controls.new.value) {
        return true;
    }else {
      return false;
    }
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
