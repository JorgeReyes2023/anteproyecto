import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent },
];
