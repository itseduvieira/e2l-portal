import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { DetailRegisterComponent } from '../../pages/detail-register/detail-register.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'detail',        component: DetailRegisterComponent }
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'plans',          component: PlansComponent },
    // { path: 'revenue',           component: RevenueComponent },
    // { path: 'customers',         component: CustomersComponent },
    // { path: 'customers/:id',   component: CustomersFormComponent, data: { selected: null } }
];
