import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EnquireComponent } from 'src/app/enquire/enquire.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.component.html',
  styleUrls: ['./view-notifications.component.scss']
})
export class ViewNotificationsComponent {
  displayedColumns: string[] = ['email', 'message'];
  @Input() notificationData: any;
  data: any;
  dataSource = new MatTableDataSource<any>();

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.api.genericGet('/get-enquiry')
      .subscribe({
        next: (res: any) => {
          this.dataSource = res;
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }

  viewEnquiry(_data:any):void{
    this.dialog.open(EnquireComponent,{
      data: _data,
      width:"40%"
    })
  }
  
}
