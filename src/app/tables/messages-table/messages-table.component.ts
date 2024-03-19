import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ContactComponent } from 'src/app/components/contact/contact.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-messages-table',
  templateUrl: './messages-table.component.html',
  styleUrls: ['./messages-table.component.scss']
})

export class MessagesTableComponent {
  displayedColumns: string[] = ['name', 'email', 'view'];
  dataSource = new MatTableDataSource<any>();

  constructor(private api: ApiService, private dialog:MatDialog){
    this.api.genericGet('/contact')
      .subscribe({
        next: (res: any) => {
          this.dataSource = res;
          console.log(this.dataSource)
        },
        error: (err: any) => console.log('Error', err),
        complete: () => { }
      });
  }
 
//adding filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewMessage(_data:any) {
    this.dialog.open(ContactComponent,{
      data: _data,
      width:"50%"
    })
  }
 
}
