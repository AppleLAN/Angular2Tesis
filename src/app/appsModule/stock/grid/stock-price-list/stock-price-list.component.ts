import { Component, OnInit, ViewChild } from '@angular/core';
import { StockState } from './../../../../appsModule/stock/reducers/grid.reducer';
import { PriceList } from './../../../../interfaces/price.list';
import { SpinnerService } from './../../../../services/spinner.service';
import { StockService } from './../../../../services/stock.service';
import { StockPriceListModalComponent } from '../stock-price-list-modal/stock-price-list-modal.component';

@Component({
  selector: 'app-stock-price-list',
  templateUrl: './stock-price-list.component.html',
  styleUrls: ['../../stock.component.scss']
})
export class StockPriceListComponent implements OnInit {
  @ViewChild('priceListModal') priceListModal: StockPriceListModalComponent;
  priceList: PriceList;
  error: String;
  storage: StockState;
  filter: string = null;
  filteredPriceLists: PriceList[];
  showModal = false;

  constructor(private stockService: StockService, private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.spinnerService.displayLoader(true);
    this.stockService.getStockStorage().subscribe(storage => {
      if (storage) {
        this.storage = storage;
        this.filteredPriceLists = storage.priceLists;
        this.spinnerService.displayLoader(false);
      }
    });

    this.stockService.getPriceLists().subscribe();
  }

  onChange(event: string) {
    if (event.length > 2) {
      this.filteredPriceLists = this.storage.priceLists.filter(p => p.name.toUpperCase().includes(event.toUpperCase()));
    } else {
      this.filteredPriceLists = this.storage.priceLists;
    }
  }

  editModal(product: PriceList) {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = true;
      setTimeout(() => {
        this.priceListModal.changeInformation(product);
      }, 0);
    }, 0);
  }

  newModal() {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = true;
      setTimeout(() => {
        this.priceListModal.openNewPriceListModal();
      }, 0);
    }, 0);
  }
}
