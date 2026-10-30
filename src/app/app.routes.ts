import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AccountCreation } from './pages/account-creation/account-creation';
import { Home } from './pages/home/home';
import { CustomerDashboard } from './pages/customer-dashboard/customer-dashboard';
import { CustomerAddress } from './pages/customer-address/customer-address';
import { CustomerProfile } from './pages/customer-profile/customer-profile';
import { CustomerSettings } from './pages/customer-settings/customer-settings';
import { NotFound } from './pages/not-found/not-found';
import { userAuthenticatedGuard } from './guards/user-authenticated-guard';

export const routes: Routes = [
    { path: 'login', component: Login, canMatch: [userAuthenticatedGuard] },
    { path: 'create-account', component: AccountCreation, canActivate: [userAuthenticatedGuard] },
    { path: 'home', component: Home },

    {
        path: 'dashboard',
        component: CustomerDashboard,
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full'},
            { path: 'addresses', component: CustomerAddress },
            { path: 'profile', component: CustomerProfile },
            { path: 'settings', component: CustomerSettings }
        ]
    },

    { path: "not-found", component: NotFound },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: "**", redirectTo: 'not-found', pathMatch: 'full' }
];
