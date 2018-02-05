import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartService } from '../../../services/chart.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-stock-charts',
  templateUrl: './stock.charts.component.html',
  styleUrls: ['../stock.component.scss']
})

export class StockChartsComponent implements OnInit, OnDestroy {
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
            this.chartService.getStockChartData();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
