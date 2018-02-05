import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { Observable } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients.grid.component.html',
  styleUrls: ['../clients.component.scss']
})

export class ClientsGridComponent implements OnInit {
  clientStorage: Observable<Client[]>
  clients: Client;
  error: String;

  constructor(
    private clientsService: ClientsService) {
  }
  ngOnInit() {
    this.clientStorage = this.clientsService.getClientStorage();
    this.clientsService.getClients().subscribe();
  }
}
