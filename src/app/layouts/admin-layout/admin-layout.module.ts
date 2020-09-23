import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CustomersComponent } from '../../pages/customers/customers.component';
import { CustomersFormComponent } from '../../pages/customers-form/customers-form.component';
import { RevenueComponent } from '../../pages/revenue/revenue.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { PlansComponent } from '../../pages/plans/plans.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { AuthGuard } from "../../guards/auth-guard.service";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QRCodeModule } from 'angularx-qrcode';
import { DetailRegisterComponent } from '../../pages/detail-register/detail-register.component';
import { UserService } from 'src/app/services/user.service';
// import { ToastrModule } from 'ngx-toastr';

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
    RevenueComponent,
    DetailRegisterComponent
  ]
})

export class AdminLayoutModule {}
