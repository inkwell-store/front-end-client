import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AccountCreation } from './pages/account-creation/account-creation';
import { Home } from './pages/home/home';
import { CustomerDashboard } from './pages/customer-dashboard/customer-dashboard';
import { CustomerAddress } from './pages/customer-address/customer-address';
import { CustomerProfile } from './pages/customer-profile/customer-profile';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'create-account', component: AccountCreation },
    { path: 'home', component: Home },

    {
        path: 'dashboard',
        component: CustomerDashboard,
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full'},
            { path: 'addresses', component: CustomerAddress },
            { path: 'profile', component: CustomerProfile }
        ]
    }
];
