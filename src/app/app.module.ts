import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BorrowerComponent } from './dashboards/borrower/borrower.component';
import { LoanOfficerComponent } from './dashboards/loan-officer/loan-officer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoanOfficerTableComponent } from './tables/loan-officer-table/loan-officer-table.component';
import { DonutComponent } from './charts/donut/donut.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    BorrowerComponent,
    LoanOfficerComponent,
    LoanOfficerTableComponent,
    DonutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
