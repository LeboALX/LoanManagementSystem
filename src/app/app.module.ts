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
import { ProfileComponent } from './components/profile/profile.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ProgressBarComponent } from './charts/progress-bar/progress-bar.component';
import { LandingComponent } from './landing/landing.component';
import { PieComponent } from './charts/pie/pie.component';
import { LoanPolicyComponent } from './loan-policy/loan-policy.component';
import { EnquireComponent } from './enquire/enquire.component';
import { RegisterComponent } from './components/register/register.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateAccountComponent } from './popUps/create-account/create-account.component';
import { MessageComponent } from './components/message/message.component';
import { ViewNotificationsComponent } from './popUps/view-notifications/view-notifications.component';
import { DetailsComponent } from './components/details/details.component';
import { MessagesTableComponent } from './tables/messages-table/messages-table.component';
import { BorrowersComponent } from './components/borrowers/borrowers.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShortTermLoanConsditionsComponent } from './components/short-term-loan-consditions/short-term-loan-consditions.component';
import { LongTermLoanConsditionsComponent } from './components/long-term-loan-consditions/long-term-loan-consditions.component';


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
    ProfileComponent,
    ProgressBarComponent,
    RegisterComponent,
    ContactComponent,
    PageNotFoundComponent,
    ContactComponent,
    CreateAccountComponent,
   
    MessagesTableComponent,
    MessageComponent,
    ViewNotificationsComponent,
    DetailsComponent,
    BorrowersComponent,
    ShortTermLoanConsditionsComponent,
    LongTermLoanConsditionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 730,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "pink",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    MatFormFieldModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
