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
  private sale_point: string;
  invoice_number: string;
  clientStorage: Observable<Client[]>;
  client: Client;
  userStorage: Observable<CompleteUser>;
  cae: string;
  vto: Vto = {
    year: null,
    month: null,
    day: null
  };
  docNro: number;
  cuit: number;

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
    this.userService.getUserStorage().subscribe(state => {
      this.sale_point = state.company.sale_point;
    });
  }

  print(): void {
    let printContents;
    this.spinnerService.displayLoader(true);
    this.stockService.getAfipCae(this.sale.id).subscribe(
      response => {
        this.spinnerService.displayLoader(false);
        if (!response.success.Err) {
          this.cuit = response.success.FeCabResp.Cuit;
          this.cae = response.success.FeDetResp.FECAEDetResponse.CAE;
          this.docNro = response.success.FeDetResp.FECAEDetResponse.DocNro;
          const vtoString = response.success.FeDetResp.FECAEDetResponse.CAEFchVto;
          const code = ('0000' + this.sale_point).substr(-4, 4);
          const saleNumber = ( '00000000' + this.sale.id.toString()).substr(-8, 8);
          this.invoice_number = `${code}-${saleNumber}`;
          this.vto.year = vtoString.slice(0, 4);
          this.vto.month = vtoString.slice(4, 6);
          this.vto.day = vtoString.slice(6, 8);
          setTimeout(() => {
            printContents = document.getElementById(this.id).innerHTML;
            printContents = `
            <html>
              <head>
                <style>
                html {
                  font-family: sans-serif;
                  line-height: 1.15;
                  -ms-text-size-adjust: 100%;
                  -webkit-text-size-adjust: 100%;
                }
                .app, app-dashboard, app-root {
                  display: flex;
                  flex-direction: column;
                  min-height: 100vh;
                }
                body {
                  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
                  font-size: .875rem;
                  font-weight: 400;
                  line-height: 1.5;
                  color: #444D58;
                  background-color: #EFF3F8;
                }
                .tipo {
                  position: absolute;
                  top: 0;
                  left: 0;
                  margin: 0 auto;
                  right: 0;
                  width: 70px;
                  z-index: 1;
                  font-size: 70px;
                  font-weight: 700;
                  padding: 0!important;
                  text-align: center;
                  height: 100%;
                }
                .tipo span {
                  position: relative;
                  display: block;
                  background-color: #fff;
                  line-height: 55px;
                  padding: 10px;
                  padding-top: 7px;
                  border: solid 1px #e3e8ec;
                }
                .table {
                  border-collapse: collapse;
                  background-color: transparent;
                  width: 100%;
                  max-width: 100%;
                  margin-bottom: 1rem;
                }
                table.table {
                  clear: both;
                  max-width: none!important;
                }
                .table-bordered {
                  border: 1px solid #E3E8EC;
                }
                .table-bordered th, .table-bordered td {
                  border: 1px solid #E3E8EC;
                }
                .table th, .table td {
                    padding: .75rem;
                    vertical-align: top;
                    border-top: 1px solid #E3E8EC;
                }
                #header td {
                  width: 50%!important;
                }
                .table-bordered th, .table-bordered td {
                    border: 1px solid #E3E8EC;
                }
                th:last-child, td:last-child {
                    width: 250px;
                    text-align: center;
                }
                *, *::before, *::after {
                  box-sizing: inherit;
                }
                h3 {
                    display: block;
                    font-size: 25px;
                    text-transform: uppercase;
                    font-weight: 700;
                    margin-bottom: 20px;
                }

                h3, .h3 {
                    font-size: 1.75rem;
                }
                h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
                    margin-bottom: .5rem;
                    font-family: inherit;
                    font-weight: 500;
                    line-height: 1.1;
                    color: inherit;
                }
                h1, h2, h3, h4, h5, h6 {
                    margin-top: 0;
                    margin-bottom: .5rem;
                }
                h6, .h6 {
                  font-size: 1rem;
                }
                p {
                  margin-top: 0;
                  font-size: 13px;
                  line-height: 15px;
                  margin-bottom: 0;
                }
                small, .small {
                    font-size: 80%;
                    font-weight: 400;
                }
                h3 small {
                  display: block;
                  font-size: 9px;
                }
                </style>
              </head>
              ${printContents}
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
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', 'Se ha encontrado un error en los servidores de AFIP, por favor intente luego');
      }
    );
  }
}
