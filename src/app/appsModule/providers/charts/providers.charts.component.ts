import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from '../../../services/chart.service';

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
  charts: any;
  getItem = 'providers';

  constructor(
    private chartService: ChartService,
    private route: ActivatedRoute
  ) {
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
