import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { Observable } from 'rxjs/Rx';
import { Client } from '../../../interfaces/client';
import { SpinnerService } from '../../../services/spinner.service';
import { ClientModal } from '../clientModal/client.modal';

@Component({
  selector: 'app-clients-grid',
  templateUrl: './clients.grid.component.html',
  styleUrls: ['../clients.component.scss']
})
export class ClientsGridComponent implements OnInit {
  @ViewChild('clientModal') clientModal: ClientModal;
  clients: Client;
  error: String;
  clientStorage: Client[];
  filter: string = null;
  filteredClients: Client[];
  showModal = false;

  constructor(private clientsService: ClientsService, private spinnerService: SpinnerService) {}
  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.clientsService.getClientStorage().subscribe(clients => {
      if (clients) {
        this.clientStorage = clients;
        this.filteredClients = clients;
      }
    });
    this.clientsService.getClients().subscribe(r => {
      this.spinnerService.displayLoader(false);
    });
  }

  onChange(event: string) {
    if (event.length > 2) {
      this.filteredClients = this.clientStorage.filter(
        c =>
          c.name.toUpperCase().includes(event.toUpperCase()) ||
          c.fantasyName.toUpperCase().includes(event.toUpperCase()) ||
          c.email.toUpperCase().includes(event.toUpperCase()) ||
          c.cuit.toUpperCase().includes(event.toUpperCase())
      );
    } else {
      this.filteredClients = this.clientStorage;
    }
  }

  editModal(client: Client) {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = true;
      setTimeout(() => {
        this.clientModal.changeInformation(client);
      }, 0);
    }, 0);
  }

  newModal() {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = true;
      setTimeout(() => {
        this.clientModal.openNewClientModal();
      }, 0);
    }, 0);
  }
}
