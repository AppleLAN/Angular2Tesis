import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import { Provider } from '../../../interfaces/provider';

import { initialModalObject } from '../reducers/grid.reducer';

@Component({
  selector: 'app-providers-charts-cards',
  templateUrl: './providers.charts.cards.component.html',
  styleUrls: ['../providers.component.scss']
})

export class ProvidersChartsCardsComponent {
    providersStorage: Observable<Provider>
    providers: Provider;
    error: String;
    demo: Boolean = true;

    constructor(
        private fb: FormBuilder,
        private authService: UserAuthenticationService,
        private clientsService: ProvidersService,
        private store: Store<Provider>) {
        }

}
