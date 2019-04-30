import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { orderBy, uniqBy } from 'lodash';
import { Subscription } from 'rxjs/Subscription';
import { initialModalObject } from './../../../../appsModule/stock/reducers/grid.reducer';
import { PriceList } from './../../../../interfaces/price.list';
import { Product } from './../../../../interfaces/stock';
import { StockService } from './../../../../services/stock.service';
import { ValidationService } from './../../../../services/validation.service';
import { StockModal } from './../../../../appsModule/stock/stockModal/stock.modal';
declare var jQuery: any;

@Component({
  selector: 'app-price-list-modal',
  templateUrl: './stock-price-list-modal.component.html',
  styleUrls: ['./stock-price-list-modal.component.scss']
})
export class StockPriceListModalComponent implements OnInit, OnDestroy {
  stockStorage: Subscription;
  priceListsForm: FormGroup;
  error: String;
  priceListsFormEmptyObject = initialModalObject.priceLists[0];
  options: any;
  productsToChoose: Product[];

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
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
    this.priceListsForm = this.fb.group({
      id: [''],
      products: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100), this.vs.emptySpaceValidator]],
      new: [true]
    });

    this.stockStorage = this.stockService.getStockStorage().subscribe(stock => {
      if (stock && stock.products.length > 0 && stock.products[0].name) {
        this.productsToChoose = uniqBy(stock.products, 'name');
        this.productsToChoose = orderBy(this.productsToChoose, 'name');
      }
    });
    this.stockService.getProducts().subscribe();
    this.stockService.getPriceLists().subscribe();
  }

  changeInformation(priceList: PriceList) {
    this.priceListsForm.reset();
    const priceListsForm: any = priceList;
    priceListsForm.new = false;
    this.priceListsForm.patchValue(priceListsForm);
    jQuery('.ui.modal.price-list-modal').modal('show');
  }

  openNewPriceListModal() {
    this.priceListsForm.reset();
    let priceListsFormObject: any;
    priceListsFormObject = this.priceListsFormEmptyObject;
    priceListsFormObject.new = true;
    this.priceListsForm.patchValue(priceListsFormObject);
    jQuery('.ui.modal.price-list-modal').modal('show');
  }

  isNew(priceListsForm: any) {
    if (priceListsForm.controls.new.value) {
      return true;
    } else {
      return false;
    }
  }

  addPriceList({ value }: { value: PriceList }) {
    this.stockService.addPriceList(value).subscribe(
      suc => {
        this.ns.success('Perfecto!', 'Su lista de precios ha sido agregada');
        jQuery('.ui.modal.price-list-modal').modal('hide');
      },
      error => this.ns.error('Error!', error.error.error)
    );
  }

  updatePriceList({ value }: { value: PriceList }) {
    this.stockService.updatePriceLists(value).subscribe(
      suc => {
        this.ns.success('Perfecto!', 'Su lista de precios ha sido actualizada');
        jQuery('.ui.modal.price-list-modal').modal('hide');
      },
      error => this.ns.error('Error!', error.error.error)
    );
  }

  deletePriceList({ value }: { value: PriceList }) {
    this.stockService.deletePriceList(value).subscribe(
      suc => {
        this.ns.success('Perfecto!', 'Su lista de precios ha sido eliminada');
        jQuery('.ui.modal.price-list-modal').modal('hide');
      },
      error => this.ns.error('Error!', error.error.error)
    );
  }

  ngOnDestroy() {
    this.stockStorage.unsubscribe();
  }
}
