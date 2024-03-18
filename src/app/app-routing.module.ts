import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoanOfficerComponent } from './dashboards/loan-officer/loan-officer.component';
import { BorrowerComponent } from './dashboards/borrower/borrower.component';
import { LogInComponent } from './popup/log-in/log-in.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path : 'landing', component: LandingComponent},
    { path: 'home', component: HomeComponent, children : [
    { path : 'loan-officer', component: LoanOfficerComponent},
    { path : 'burrower', component: BorrowerComponent},
]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
