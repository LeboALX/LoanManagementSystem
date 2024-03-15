import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { LandingComponent } from 'src/app/landing/landing.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnChanges{

  @Input() totalAmount!: any;
  @Input() interrestPayable!: any;


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      legend: {
        position: "top"
      },
    },
  };

  public pieChartLabels = ['Total Amount', 'Total interests payable'];
  public pieChartDatasets : any;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(public shared: SharedService){}
  ngOnChanges(changes: SimpleChanges): void {
     this.pieChartDatasets = [{
      data: [this.totalAmount, this.interrestPayable],
      backgroundColor: [, '#f00101', '#3cba5f']
    }];
  }
  ngAfterViewInit(): void {
   
  }
}
