import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { QRCodeModule } from 'angularx-qrcode';

import { CustomersFormComponent } from '../../pages/customers-form/customers-form.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { RevenueComponent } from '../../pages/revenue/revenue.component';
import { PlansComponent } from '../../pages/plans/plans.component';
import { AdminLayoutRoutes } from './admin-layout.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    QRCodeModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    PlansComponent,
    CustomersComponent,
    CustomersFormComponent,
    RevenueComponent
  ]
})

export class AdminLayoutModule {}
