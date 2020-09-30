import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { CustomersComponent } from 'src/app/pages/customers/customers.component';
import { CustomersFormComponent } from 'src/app/pages/customers-form/customers-form.component';
import { Role } from 'src/app/models/role.model';
import { AuthGuard } from 'src/app/guards/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    {   path: '', 
        canActivateChild: [AuthGuard], 
        children: [
            { path: 'dashboard',      component: DashboardComponent },
            { path: 'customers',         component: CustomersComponent, data: { roles: Role.Admin } },
            { path: 'customers/new',   component: CustomersFormComponent, data: { roles: Role.Admin } }
        ]
    }
];
