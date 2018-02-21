import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';

@Component({
  selector: 'app-providers-charts-cards',
  templateUrl: './providers.charts.cards.component.html',
  styleUrls: ['../providers.component.scss']
})

export class ProvidersChartsCardsComponent {
    providersStorage: Observable<Provider>;
    providers: Provider;
    error: String;
    demo: Boolean = true;

    constructor() {}

}
