import { Routes } from '@angular/router';
import { roleGuard } from '../interceptors/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { createUserComponent } from '../components/create-user/create-user.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UsersDataComponent } from '../components/users-data/users-data.component';
import { CompaniesDataComponent } from '../components/companies-data/companies-data.component';
import { ProjectsDataComponent } from '../components/projects-data/projects-data.component';

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
  {
    path: 'companies',
    component: CompaniesDataComponent,
    canActivate: [roleGuard(['admin'])],
  },
  {
    path: 'projects',
    component: ProjectsDataComponent,
    canActivate: [roleGuard(['admin'])],
  },
  // Redirects
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
