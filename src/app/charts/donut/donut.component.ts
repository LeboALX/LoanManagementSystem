import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

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
  public pieChartDatasets :any;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private api: ApiService, private sharedService: SharedService){
    this.refreshPie();
    this.sharedService.watchPieUpdates().subscribe((changes: any) => {
      this.refreshPie();
    })
  }

  refreshPie(): void {
    this.api.genericGet('/get-loans')
      .subscribe({
        next: (res: any) => {
          const pendingCount = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'pending').length
          const declinedCount = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'declined').length
          const approvedCount = res.filter((loan: any) => loan.loanStatutus.toLowerCase() === 'approved').length

          this.pieChartDatasets = [{
            data: [pendingCount, declinedCount, approvedCount],
            backgroundColor: ['#cd2e37', '#FFA500', '#cd2e37;']
          }];
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }
}
