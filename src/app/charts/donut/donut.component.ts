import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent {
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Approved Loans' ], [ 'Pending Requests' ], ['Declined Requests'] ];
  public pieChartDatasets = [ {
    data: [ 300, 400, 880 ],
    backgroundColor: ['#cd2e37', '#FFA500', '#cd2e37;']
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
