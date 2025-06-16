import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { roleGuard } from '../interceptors/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent, canActivate: [roleGuard(['admin'])] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard(['user'])] },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
];
