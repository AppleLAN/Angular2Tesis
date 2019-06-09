import { SaleState } from '../reducers/sale.reducer';
import { Observable } from 'rxjs/Rx';
import { SaleService } from '../services/sale.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../interfaces/client';
import * as moment from 'moment';

@Component({
  selector: 'created-sales',
  templateUrl: './created-sales.component.html',
  styleUrls: ['./orders.component.scss']
})
export class CreatedSalesComponent implements OnInit {
  $sales: Observable<SaleState>;
  salesStorage: SaleState[];
  filteredSales: SaleState[];
  clients: Client[];
  constructor(private ss: SaleService, private spinnerService: SpinnerService, private clientsService: ClientsService) {}

  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.ss
      .getAllSales()
      .combineLatest(this.clientsService.getClientStorage())
      .subscribe(([sales, clientStorage]) => {
        this.salesStorage = sales.data
          ? sales.data.map((sale: any) => {
              sale.sale.created_at = moment(sale.sale.created_at).format('YYYY-MM-DD');
              return sale;
            })
          : null;
        this.filteredSales = sales.data;
        this.clients = clientStorage;
        this.spinnerService.displayLoader(false);
      });
    this.$sales = this.ss.getSaleStorage();
    this.clientsService.getClients().subscribe();
  }

  onChange(event: string) {
    if (event.length > 0) {
      this.filteredSales = this.salesStorage.filter(
        s =>
          s.sale.client_name.toUpperCase().includes(event.toUpperCase()) ||
          s.sale.id.toString().includes(event.toUpperCase()) ||
          s.sale.payments.toUpperCase().includes(event.toUpperCase())
      );
    } else {
      this.filteredSales = this.salesStorage;
    }
  }
}
