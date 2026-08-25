import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AccountCreation } from './pages/account-creation/account-creation';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'create-account', component: AccountCreation },
    { path: 'home', component: Home }
];
