import { StockState } from '../reducers/grid.reducer';
import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { Subscription } from 'rxjs/Rx';

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
    private stockService: StockService) {
  }
  ngOnInit() {
    this.stockStorage = this.stockService.getStockStorage().subscribe(storage => {
      this.storage = storage;
    });
    this.stockService.getStateInformation().subscribe();
  }
}
