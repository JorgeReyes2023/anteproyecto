import { Role } from './role';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  user_role?: Role;
  company?: string;
}

export interface UserUpdate {
  id: number;
  name?: string;
  email?: string;
  role?: string;
  company?: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  role: string;
  company?: string;
}
