import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CustomersComponent } from 'src/app/pages/customers/customers.component';
import { CustomersFormComponent } from 'src/app/pages/customers-form/customers-form.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'detail',        component: DetailRegisterComponent }
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'plans',          component: PlansComponent },
    // { path: 'revenue',           component: RevenueComponent },
    // { path: 'customers',         component: CustomersComponent },
    // { path: 'customers/new',   component: CustomersFormComponent }
];
