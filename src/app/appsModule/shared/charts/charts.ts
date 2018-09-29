import { ChartService } from './../../../services/chart.service';
import { Subscription } from 'rxjs/Rx';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'charts',
  templateUrl: './charts.html'
})
export class ChartComponent implements OnInit {
  @Input() itemToGet: string;
  @Input() chartType: String = 'line';
  @Input() demo: Boolean = false;
  
  lineChartData: Array<any>;
  lineChartLabels: Array<any>;
  lineChartOptions: any;
  lineChartColors: Array<any>;
  lineChartLegend: Boolean;
  chartStorage: Subscription;

  constructor(private chartService: ChartService) {}
  ngOnInit() {
    if (!this.demo) {
      this.chartStorage = this.chartService.getChartStorage().subscribe(data => {
          if (data && data[this.itemToGet]) {
            this.lineChartData = data[this.itemToGet].result;
            this.lineChartLabels = data[this.itemToGet].months;
          }
      });
    } else {
      this.lineChartData = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
      ];
      this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    }

    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
    this.lineChartColors = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    this.lineChartLegend = true;
  }

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
