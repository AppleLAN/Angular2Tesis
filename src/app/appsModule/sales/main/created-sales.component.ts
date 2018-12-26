import { SaleState } from '../reducers/sale.reducer';
import { Observable } from 'rxjs/Rx';
import { SaleService } from '../services/sale.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../services/spinner.service';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../interfaces/client';

@Component({
  selector: 'created-sales',
  templateUrl: './created-sales.component.html',
  styleUrls: ['./orders.component.scss']
})
export class CreatedSalesComponent implements OnInit {
  $sales: Observable<SaleState>;
  clients: Client[];
  constructor(private ss: SaleService, private spinnerService: SpinnerService, private clientsService: ClientsService) {}

  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.ss
      .getAllSales()
      .combineLatest(this.clientsService.getClientStorage())
      .subscribe(([sales, clientStorage]) => {
        this.clients = clientStorage;
        this.spinnerService.displayLoader(false);
      });
    this.$sales = this.ss.getSaleStorage();
    this.clientsService.getClients().subscribe();
  }
}
