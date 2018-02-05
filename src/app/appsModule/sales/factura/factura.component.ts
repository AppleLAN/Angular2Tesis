import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'factura',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit{
  options: any;

  constructor(private ns: NotificationsService) { 
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    }
  }

  ngOnInit() {
    
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('to-print').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
            .factura-container {
              padding: 15px;
              border-bottom: 1px solid black;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}