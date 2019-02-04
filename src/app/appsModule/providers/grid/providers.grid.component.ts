import { Component, OnInit, ViewChild } from '@angular/core';
import { Provider } from '../../../interfaces/provider';
import { ProvidersService } from '../../../services/providers.service';
import { SpinnerService } from '../../../services/spinner.service';
import { ProviderModal } from '../providersModal/providers.modal';

@Component({
  selector: 'app-providers-grid',
  templateUrl: './providers.grid.component.html',
  styleUrls: ['../providers.component.scss']
})
export class ProvidersGridComponent implements OnInit {
  @ViewChild('providerModal') providerModal: ProviderModal;
  providerStorage: Provider[];
  providers: Provider;
  error: String;
  filter: string;
  filteredProviders: Provider[] = null;
  showModal = false;

  constructor(private providersService: ProvidersService, private spinnerService: SpinnerService) {}
  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.providersService.getProviderStorage().subscribe(providers => {
      this.providerStorage = providers;
      this.filteredProviders = providers;
    });
    this.providersService.getProviders().subscribe(r => {
      this.spinnerService.displayLoader(false);
    });
  }

  onChange(event: string) {
    if (event.length > 2) {
      this.filteredProviders = this.providerStorage.filter(
        c =>
          c.name.toUpperCase().includes(event.toUpperCase()) ||
          c.fantasyName.toUpperCase().includes(event.toUpperCase()) ||
          c.email.toUpperCase().includes(event.toUpperCase()) ||
          c.cuit.toUpperCase().includes(event.toUpperCase())
      );
    } else {
      this.filteredProviders = this.providerStorage;
    }
  }

  editModal(provider: Provider) {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = true;
      setTimeout(() => {
        this.providerModal.changeInformation(provider);
      }, 0);
    }, 0);
  }

  newModal() {
    this.showModal = false;
    setTimeout(() => {
      this.showModal = true;
      setTimeout(() => {
        this.providerModal.openNewProviderModal();
      }, 0);
    }, 0);
  }
}
