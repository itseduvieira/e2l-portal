import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CustomersComponent } from 'src/app/pages/customers/customers.component';
import { CustomersFormComponent } from 'src/app/pages/customers-form/customers-form.component';
import { Role } from 'src/app/models/role.model';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'customers',         component: CustomersComponent },
    { path: 'customers/new',   component: CustomersFormComponent }
];
