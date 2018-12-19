import { StockService } from '../../../services/stock.service';
import { Product } from '../../../interfaces/stock';
import { Details, Sale } from '../../../interfaces/sale';
import { Client } from '../../../interfaces/client';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ClientsService } from '../../../services/clients.service';
import { UserService } from '../../../services/user.service';
import { CompleteUser } from '../../../interfaces/complete.user';

interface Vto {
  year: string;
  month: string;
  day: string;
}

@Component({
  selector: 'factura',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit {
  options: any;
  @Input() id: string;
  @Input() products_details: [Details];
  @Input() products: [Details];
  @Input() sale: Sale;
  clientStorage: Observable<Client[]>;
  client: Client;
  userStorage: Observable<CompleteUser>;
  cae: string;
  vto: Vto = {
    year: null,
    month: null,
    day: null
  };

  constructor(
    private ns: NotificationsService,
    private clientsService: ClientsService,
    private userService: UserService,
    private stockService: StockService
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    this.clientStorage = this.clientsService.getClientStorage();
    this.clientStorage.subscribe(c => {
      if (c) {
        const clients = c;
        this.client = clients.find(cl => cl.id === this.sale.client_id);
      }
    });
    this.clientsService.getClients().subscribe();
    this.userStorage = this.userService.getUserStorage();
  }

  print(): void {
    let printContents;
    this.stockService.getAfipCae(this.sale.id).subscribe(response => {
      this.cae = response.success.FeDetResp.FECAEDetResponse.CAE;
      const vtoString = response.success.FeDetResp.FECAEDetResponse.CAEFchVto;
      this.vto.year = vtoString.slice(0, 4);
      this.vto.month = vtoString.slice(4, 6);
      this.vto.day = vtoString.slice(6, 8);
      printContents = document.getElementById(this.id).innerHTML;
      printContents = `
        <html>
          <head>
            <title>Print tab</title>
            <style>

              img {
                width: 120px;
                heigth: 120px;
                padding-top: 15px;
                padding-bottom: 15px;
              }

              .factura-container {
                padding-left: 15px;
                padding-right: 15px;
                border: 1px solid black;
              }

              .ui.container {
                display: block;
                max-width: 100% !important;
              }

              .three {
                width: 31% !important;
                padding-left: 5px;
                padding-right: 5px;
                display: inline-block;
                vertical-align: top;
              }

              .four {
                width: 23% !important;
                padding-left: 5px;
                padding-right: 5px;
                display: inline-block;
                vertical-align: top;
              }

              .eigth {
                padding-left: 5px;
                padding-right: 5px;
                display: inline-block;
                vertical-align: top;
              }

              .eigth:first-child {
                width: 60% !important;
              }

              .eigth:last-child {
                width: 36% !important;
              }

              .sixteen {
                width: 100% !important;
                padding-left: 5px;
                padding-right: 5px;
                display: inline-block;
                vertical-align: top;
              }

              .ui.grid + .grid {
                margin-top: 1rem;
              }

              .ui.table {
                width: 100%;
                background: #FFFFFF;
                -webkit-box-shadow: none;
                box-shadow: none;
                text-align: left;
                color: rgba(0, 0, 0, 0.87);
                border-collapse: separate;
                border-spacing: 0px;
              }

              .table tr td{
                border-top: 1px solid rgba(34, 36, 38, 0.15);
              }

              .ui.table:first-child {
                margin-top: 0em;
              }

              .ui.table:last-child {
                margin-bottom: 0em;
              }
            </style>
          </head>
          <body>${printContents}</body>
        </html>`;

      const frame1 = document.createElement('iframe');
      frame1.name = 'frame1';
      frame1.style.position = 'absolute';
      frame1.style.top = '-1000000px';
      document.body.appendChild(frame1);
      const frameDoc = frame1.contentWindow;
      frameDoc.document.open();
      frameDoc.document.write(printContents);
      frameDoc.document.close();

      setTimeout(function() {
        frameDoc.focus();
        frameDoc.print();
      }, 500);

      // Remove the iframe after a delay of 1.5 seconds
      // (the delay is required for this to work on iPads)
      setTimeout(function() {
        document.body.removeChild(frame1);
      }, 1500);
      return false;
    });
  }
}
