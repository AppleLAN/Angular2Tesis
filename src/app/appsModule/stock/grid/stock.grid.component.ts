import { StockState } from '../reducers/grid.reducer';
import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { Subscription } from 'rxjs/Rx';
import { SpinnerService } from '../../../services/spinner.service';
import { ProvidersService } from '../../../services/providers.service';
import { Provider } from '../../../interfaces/provider';

@Component({
  selector: 'app-stock-grid',
  templateUrl: './stock.grid.component.html',
  styleUrls: ['../stock.component.scss']
})
export class StockGridComponent implements OnInit {
  stockStorage: Subscription;
  error: String;
  storage: StockState;
  providers: Provider[];

  constructor(
    private stockService: StockService,
    private spinnerService: SpinnerService,
    private providersService: ProvidersService
  ) {}
  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.stockStorage = this.stockService.getStockStorage().subscribe(storage => {
      this.storage = storage;
    });
    this.stockService
      .getProducts()
      .combineLatest(this.providersService.getProviderStorage())
      .subscribe(([products, providers]) => {
        this.providers = providers;
        this.spinnerService.displayLoader(false);
      });

    this.providersService.getProviders().subscribe();
  }
}
