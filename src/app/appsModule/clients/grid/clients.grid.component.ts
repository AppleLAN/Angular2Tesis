import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { Observable } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients.grid.component.html',
  styleUrls: ['../clients.component.scss']
})

export class ClientsGridComponent implements OnInit {
  clientStorage: Observable<Client[]>;
  clients: Client;
  error: String;

  constructor(
    private clientsService: ClientsService, private spinnerService: SpinnerService) {
  }
  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.clientStorage = this.clientsService.getClientStorage();
    this.clientsService.getClients().subscribe(r => {
      this.spinnerService.displayLoader(false);
    });
  }
}
