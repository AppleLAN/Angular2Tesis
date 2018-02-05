import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';


@Component({
  selector: 'app-providers-grid',
  templateUrl: './providers.grid.component.html',
  styleUrls: ['../providers.component.scss']
})

export class ProvidersGridComponent implements OnInit {
  providerStorage: Observable<Provider[]>
  providers: Provider;
  error: String;

  constructor(
    private providersService: ProvidersService) {
  }
  ngOnInit() {
    this.providerStorage = this.providersService.getProviderStorage();
    this.providersService.getProviders().subscribe();
  }
}
