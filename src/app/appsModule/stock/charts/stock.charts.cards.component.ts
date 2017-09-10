import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { StockService } from '../../../services/stock.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import { Provider } from '../../../interfaces/provider';

import { initialModalObject } from '../reducers/grid.reducer';

@Component({
  selector: 'app-stock-charts-cards',
  templateUrl: './stock.charts.cards.component.html',
  styleUrls: ['../stock.component.scss']
})

export class StockChartsCardsComponent implements OnInit {
    stockStorage: Observable<Provider>
    stock: Provider;
    error: String;
    demo: Boolean = true;

    constructor(
        private fb: FormBuilder,
        private authService: UserAuthenticationService,
        private stockService: StockService,
        private store: Store<Provider>) {
        }
    ngOnInit() {

    }
}
