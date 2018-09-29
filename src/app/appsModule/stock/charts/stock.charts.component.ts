import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from '../../../services/chart.service';

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
  charts: any;
  getItem = 'stock';

  constructor(
    private chartService: ChartService,
    private route: ActivatedRoute
  ) {
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
