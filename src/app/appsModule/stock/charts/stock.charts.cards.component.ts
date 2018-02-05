import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';

@Component({
  selector: 'app-stock-charts-cards',
  templateUrl: './stock.charts.cards.component.html',
  styleUrls: ['../stock.component.scss']
})

export class StockChartsCardsComponent {
    stockStorage: Observable<Provider>
    stock: Provider;
    error: String;
    demo: Boolean = true;

    constructor() {}
}
