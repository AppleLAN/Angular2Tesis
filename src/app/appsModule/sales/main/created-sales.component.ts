import { SaleState } from '../reducers/sale.reducer';
import { Observable } from 'rxjs/Rx';
import { SaleService } from '../services/sale.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'created-sales',
  templateUrl: './created-sales.component.html',
  styleUrls: ['./orders.component.scss']
})
export class CreatedSalesComponent implements OnInit{
  $sales: Observable<SaleState>;
  constructor(private ss: SaleService) { }

  ngOnInit() {
    this.ss.getAllSales().subscribe();
    this.$sales = this.ss.getSaleStorage();
  }
}