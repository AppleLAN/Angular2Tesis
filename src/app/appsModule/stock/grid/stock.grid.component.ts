import { StockState } from '../reducers/grid.reducer';
import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { Subscription } from 'rxjs/Rx';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-stock-grid',
  templateUrl: './stock.grid.component.html',
  styleUrls: ['../stock.component.scss']
})
export class StockGridComponent implements OnInit {
  stockStorage: Subscription;
  error: String;
  storage: StockState;

  constructor(
    private stockService: StockService,
    private spinnerService: SpinnerService
  ) {}
  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.stockStorage = this.stockService
      .getStockStorage()
      .subscribe(storage => {
        this.storage = storage;
      });
    this.stockService.getProducts().subscribe(r => {
      this.spinnerService.displayLoader(false);
    });
  }
}
