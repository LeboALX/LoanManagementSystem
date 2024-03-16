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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { RegistarComponent } from './popup/registar/registar.component';
import { LogInComponent } from './popup/log-in/log-in.component';
import { BorrowerTableComponent } from './tables/borrower-table/borrower-table.component';
import { PaymentComponent } from './popUps/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProgressBarComponent } from './charts/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BorrowerComponent,
    LoanOfficerComponent,
    LoanOfficerTableComponent,
    DonutComponent,
    RegistarComponent,
    LogInComponent,
    BorrowerTableComponent,
    PaymentComponent,
    HomeComponent,
    ProfileComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 730,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "pink",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
