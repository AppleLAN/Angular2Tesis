import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { StockService } from '../../../services/stock.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import { Stock, Product } from '../../../interfaces/stock';

import { initialModalObject, State } from '../reducers/grid.reducer';

@Component({
  selector: 'app-stock-grid',
  templateUrl: './stock.grid.component.html',
  styleUrls: ['../stock.component.scss']
})

export class StockGridComponent implements OnInit {
  stockStorage: Subscription;
  error: String;
  storage: State;
  constructor(
    private authService: UserAuthenticationService,
    private stockService: StockService,
    private store: Store<State>) {
  }
  ngOnInit() {
    this.stockStorage = this.stockService.getStockStorage().subscribe(storage => {
      this.storage = storage;
    });
    this.stockService.getStateInformation().subscribe();
  }
}
