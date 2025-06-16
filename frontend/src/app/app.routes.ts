import { Routes } from '@angular/router';
import { roleGuard } from '../interceptors/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { createUserComponent } from '../components/create-user/create-user.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UsersDataComponent } from '../components/users-data/users-data.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users/create',
    component: createUserComponent,
    canActivate: [roleGuard(['admin'])],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [roleGuard(['user', 'admin'])],
  },
  {
    path: 'info',
    component: UserInfoComponent,
    canActivate: [roleGuard(['user', 'admin'])],
  },
  {
    path: 'users',
    component: UsersDataComponent,
    canActivate: [roleGuard(['admin'])],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
