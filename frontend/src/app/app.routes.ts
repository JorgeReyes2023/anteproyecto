import { Routes } from '@angular/router';
import { roleGuard } from '../interceptors/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { createUserComponent } from '../components/create-user/create-user.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UsersDataComponent } from '../components/users-data/users-data.component';
import { NodesDataComponent } from '../components/nodes-data/nodes-data.component';
import { CreateNodeComponent } from '../components/create-node/create-node.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UsersDataComponent,
    canActivate: [roleGuard(['admin'])],
  },
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
    path: 'nodes',
    component: NodesDataComponent,
    canActivate: [roleGuard(['admin'])],
  },
  {
    path: 'nodes/create',
    component: CreateNodeComponent,
    canActivate: [roleGuard(['admin'])],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
