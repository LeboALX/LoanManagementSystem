import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { LogInComponent } from './popup/log-in/log-in.component';
import { BorrowerTableComponent } from './tables/borrower-table/borrower-table.component';
import { PaymentComponent } from './popUps/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './landing/landing.component';
import { PieComponent } from './charts/pie/pie.component';
import { LoanPolicyComponent } from './loan-policy/loan-policy.component';
import { EnquireComponent } from './enquire/enquire.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    BorrowerComponent,
    LoanOfficerComponent,
    LoanOfficerTableComponent,
    DonutComponent,
    LandingComponent,
    PieComponent,
    LoanPolicyComponent,
    EnquireComponent,
    LogInComponent,
    BorrowerTableComponent,
    PaymentComponent,
    HomeComponent,
    PageNotFoundComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
