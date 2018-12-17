import { Component, OnInit, ViewChild, TestabilityRegistry } from '@angular/core';
import { Stock, Product } from '../../../interfaces/stock';
import { Subscription } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';
import { ProvidersService } from '../../../services/providers.service';
import { SpinnerService } from '../../../services/spinner.service';
import { StockService } from '../../../services/stock.service';
import { StockState } from '../reducers/grid.reducer';
import { StockModal } from '../stockModal/stock.modal';

@Component({
  selector: 'app-stock-grid',
  templateUrl: './stock.grid.component.html',
  styleUrls: ['../stock.component.scss']
})
export class StockGridComponent implements OnInit {
  @ViewChild('stockModal') stockModal: StockModal;
  stockStorage: Subscription;
  error: String;
  storage: StockState;
  providers: Provider[];
  showModal = false;
  filteredProducts: Product[] = [];
  filter: string = null;

  constructor(
    private stockService: StockService,
    private spinnerService: SpinnerService,
    private providersService: ProvidersService
  ) {}

  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.stockService
      .getProducts()
      .combineLatest(this.providersService.getProviderStorage(), this.stockService.getStockStorage())
      .subscribe(([products, providers, storage]) => {
        this.storage = storage;
        this.filteredProducts = storage.products;
        this.providers = providers;
        if (storage && providers) {
          this.storage.products.map(p => {
            const foundProvider = providers.find(provider => provider.id === p.provider_id);
            p.providerName = foundProvider ? foundProvider.name : null;
            return p;
          });
        }
        this.spinnerService.displayLoader(false);
      });

    this.providersService.getProviders().subscribe();
  }

  onChange(event: string) {
    if (event.length > 2) {
      this.filteredProducts = this.storage.products.filter(
        p =>
          p.name.toUpperCase().includes(event.toUpperCase()) ||
          p.providerName.toUpperCase().includes(event.toUpperCase()) ||
          p.category_id.toUpperCase().includes(event.toUpperCase()) ||
          p.code.toUpperCase().includes(event.toUpperCase())
      );
    } else {
      this.filteredProducts = this.storage.products;
    }
  }

  editModal(product: Stock) {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = true;
      setTimeout(() => {
        this.stockModal.changeInformation(product);
      }, 0);
    }, 0);
  }

  newModal() {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = true;
      setTimeout(() => {
        this.stockModal.openNewStockModal();
      }, 0);
    }, 0);
  }
}
