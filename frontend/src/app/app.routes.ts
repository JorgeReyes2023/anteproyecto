import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
];
