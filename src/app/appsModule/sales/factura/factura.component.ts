import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
import { CompleteUser } from '../../../interfaces/complete.user';
import { Details, Sale } from '../../../interfaces/sale';
import { StockService } from '../../../services/stock.service';
import { UserService } from '../../../services/user.service';
import { SpinnerService } from '../../../services/spinner.service';
import { NotificationsService } from 'angular2-notifications';

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
  @Input() clients: Client[];
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
    private userService: UserService,
    private stockService: StockService,
    private spinnerService: SpinnerService,
    private ns: NotificationsService
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    this.client = this.clients.find(cl => cl.id === this.sale.client_id);
    this.userStorage = this.userService.getUserStorage();
  }

  print(): void {
    let printContents;
    this.spinnerService.displayLoader(true);
    this.stockService.getAfipCae(this.sale.id).subscribe(response => {
      this.spinnerService.displayLoader(false);
      if (!response.success.Err) {
        this.cae = response.success.FeDetResp.FECAEDetResponse.CAE;
        const vtoString = response.success.FeDetResp.FECAEDetResponse.CAEFchVto;
        this.vto.year = vtoString.slice(0, 4);
        this.vto.month = vtoString.slice(4, 6);
        this.vto.day = vtoString.slice(6, 8);
        setTimeout(() => {
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
        }, 0);
      } else {
        this.ns.error('Error!', 'Se ha encontrado un error en los servidores de AFIP, por favor intente luego');
      }
    });
  }
}
