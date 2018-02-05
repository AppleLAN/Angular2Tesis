import { Component} from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Client } from '../../../interfaces/client';

@Component({
  selector: 'app-clients-charts-cards',
  templateUrl: './clients.charts.cards.component.html',
  styleUrls: ['../clients.component.scss']
})

export class ClientsChartsCardsComponent {
    clientStorage: Observable<Client>
    clients: Client;
    error: String;
    demo: Boolean = true;

    constructor() {
    }
}
