import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { StockService } from '../../../services/stock.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import { Stock } from '../../../interfaces/stock';

import { initialModalObject } from '../reducers/grid.reducer';

@Component({
  selector: 'app-stock-grid',
  templateUrl: './stock.grid.component.html',
  styleUrls: ['../stock.component.scss']
})

export class StockGridComponent implements OnInit {
  stockStorage: Observable<Stock>
  stock: Stock;
  error: String;

  constructor(
    private authService: UserAuthenticationService,
    private stockService: StockService,
    private store: Store<Stock>) {
  }
  ngOnInit() {
    this.stockStorage = this.stockService.getStockStorage();
    this.stockService.getStock().subscribe();
  }
}
