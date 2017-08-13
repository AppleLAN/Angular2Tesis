import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import { Provider } from '../../../interfaces/provider';

import { initialModalObject } from '../reducers/grid.reducer';

@Component({
  selector: 'app-providers-grid',
  templateUrl: './providers.grid.component.html',
  styleUrls: ['../providers.component.scss']
})

export class ProvidersGridComponent implements OnInit{
  providerStorage: Observable<Provider>
  providers: Provider;
  error: String;
  
  constructor(
    private authService: UserAuthenticationService, 
    private providersService: ProvidersService, 
    private store: Store<Provider>) {
  }
  ngOnInit() {
    this.providerStorage = this.providersService.getProviderStorage();
    this.providersService.getProviders().subscribe(); 
  } 
}