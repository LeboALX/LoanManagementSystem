import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoanOfficerComponent } from './dashboards/loan-officer/loan-officer.component';
import { BorrowerComponent } from './dashboards/borrower/borrower.component';
import { LogInComponent } from './popup/log-in/log-in.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, children : [
    { path : 'loan-officer', component: LoanOfficerComponent},
<<<<<<< HEAD
    { path : 'burrower', component: BorrowerComponent}
]},
{ path : 'login', component: LogInComponent}
];
=======
    { path : 'burrower', component: BorrowerComponent},
]}];
>>>>>>> 551d5ae600e84f389e651d6accbf47960716257e

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
