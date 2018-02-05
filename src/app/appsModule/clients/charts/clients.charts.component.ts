import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients-charts',
  templateUrl: './clients.charts.component.html',
  styleUrls: ['../clients.component.scss']
})

export class ClientsChartsComponent implements OnInit, OnDestroy{
    error: String;
    demo: Boolean = true;
    charType: String;
    sub: any;
    chartStorage: Subscription;
    charts: any;
    constructor(
        private chartService: ChartService,
        private route: ActivatedRoute) {
            this.charType = route.snapshot.params['type'];
        }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.charType = params['type'];
            this.chartService.getClientsChartData();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
