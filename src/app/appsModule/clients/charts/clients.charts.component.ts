import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { ClientsService } from '../../../services/clients.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import { initialModalObject } from '../reducers/grid.reducer';

@Component({
  selector: 'app-clients-charts',
  templateUrl: './clients.charts.component.html',
  styleUrls: ['../clients.component.scss']
})

export class ClientsChartsComponent implements OnInit{
    error: String;
    noTable: Boolean = true;
    charType: String;
    sub: any;
    chartStorage: Subscription;
    charts: any;
    constructor(
        private fb: FormBuilder, 
        private authService: UserAuthenticationService, 
        private clientsService: ClientsService, 
        private store: Store<any>,
        private route: ActivatedRoute) {
            this.charType = route.snapshot.params['type'];;
        }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.charType = params['type'];
            this.chartStorage = this.store.select('chart').subscribe(charts => {
                this.charts = charts;
            });
        });
    } 
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}