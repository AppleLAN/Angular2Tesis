import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-providers-charts',
  templateUrl: './providers.charts.component.html',
  styleUrls: ['../providers.component.scss']
})

export class ProvidersChartsComponent implements OnInit, OnDestroy {
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
            this.chartService.getProvidersChartData();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
