import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { ClientsService } from '../../../services/clients.service';
import { Observable } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';

import { Client } from '../../../interfaces/client';

import { initialModalObject } from '../reducers/grid.reducer';

@Component({
  selector: 'app-clients-charts-cards',
  templateUrl: './clients.charts.cards.component.html',
  styleUrls: ['../clients.component.scss']
})

export class ClientsChartsCardsComponent {
    clientStorage: Observable<Client>
    clients: Client;
    error: String;
    demo: Boolean = true;

    constructor(
        private fb: FormBuilder,
        private authService: UserAuthenticationService,
        private clientsService: ClientsService,
        private store: Store<Client>) {
    }
}
