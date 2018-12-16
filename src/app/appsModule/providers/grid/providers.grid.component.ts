import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';
import { SpinnerService } from '../../../services/spinner.service';

@Component({
  selector: 'app-providers-grid',
  templateUrl: './providers.grid.component.html',
  styleUrls: ['../providers.component.scss']
})
export class ProvidersGridComponent implements OnInit {
  providerStorage: Provider[];
  providers: Provider;
  error: String;

  constructor(private providersService: ProvidersService, private spinnerService: SpinnerService) {}
  ngOnInit() {
    this.spinnerService.displayLoader(true);
    this.providersService.getProviderStorage().subscribe(providers => {
      this.providerStorage = providers;
    });
    this.providersService.getProviders().subscribe(r => {
      this.spinnerService.displayLoader(false);
    });
  }
}
