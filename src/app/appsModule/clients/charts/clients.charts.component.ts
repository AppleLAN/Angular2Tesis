import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartService } from '../../../services/chart.service';

@Component({
  selector: 'app-clients-charts',
  templateUrl: './clients.charts.component.html',
  styleUrls: ['../clients.component.scss']
})
export class ClientsChartsComponent implements OnInit, OnDestroy {
  error: String;
  demo: Boolean = true;
  charType: String;
  sub: any;
  charts: any;
  getItem = 'clients';

  constructor(
    private chartService: ChartService,
    private route: ActivatedRoute
  ) {
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
