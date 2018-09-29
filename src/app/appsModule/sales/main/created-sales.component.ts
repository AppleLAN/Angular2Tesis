import { SaleState } from '../reducers/sale.reducer';
import { Observable } from 'rxjs/Rx';
import { SaleService } from '../services/sale.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'created-sales',
  templateUrl: './created-sales.component.html',
  styleUrls: ['./orders.component.scss']
})
export class CreatedSalesComponent implements OnInit {
  $sales: Observable<SaleState>;
  constructor(private ss: SaleService, private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.ss.getAllSales().subscribe(r => {
      this.spinnerService.displayLoader(false);
    });
    this.$sales = this.ss.getSaleStorage();
  }
}