import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoanOfficerComponent } from './dashboards/loan-officer/loan-officer.component';
import { BorrowerComponent } from './dashboards/borrower/borrower.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LandingComponent } from './landing/landing.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoanPolicyComponent } from './loan-policy/loan-policy.component';
import { BorrowersComponent } from './components/borrowers/borrowers.component';
import { MessageComponent } from './components/message/message.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'loan-officer', component: LoanOfficerComponent },
      { path: 'borrower', component: BorrowerComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'loan-policy', component: LoanPolicyComponent },
      { path: 'borrowers', component: BorrowersComponent},
      { path: 'message', component: MessageComponent}

    ]
  }
  , { path: '**', component: PageNotFoundComponent }];
  
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
