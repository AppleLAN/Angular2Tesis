import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user';
import { UserAuthenticationService } from '../../../services/user-authentication.service';
import { ChartService } from '../../../services/chart.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import { initialModalObject } from '../reducers/grid.reducer';

@Component({
  selector: 'app-providers-charts',
  templateUrl: './providers.charts.component.html',
  styleUrls: ['../providers.component.scss']
})

export class ProvidersChartsComponent implements OnInit{
    error: String;
    demo: Boolean = true;
    charType: String;
    sub: any;
    chartStorage: Subscription;
    charts: any;
    constructor(
        private fb: FormBuilder, 
        private authService: UserAuthenticationService, 
        private chartService: ChartService, 
        private store: Store<any>,
        private route: ActivatedRoute) {
            this.charType = route.snapshot.params['type'];;
        }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.charType = params['type'];
            this.chartService.getChartData();
        });
    } 
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}