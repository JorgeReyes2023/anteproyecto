import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GeneralService } from './general.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserCreate } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor(private generalService: GeneralService) {
    let userJson: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      userJson = localStorage.getItem('user');
    }
    this.userSubject = new BehaviorSubject<User | null>(
      userJson ? JSON.parse(userJson) : null
    );
    this.user$ = this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    return this.generalService.postData('auth/login', { email, password }).pipe(
      tap((response) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userSubject.next(response.user);
        }
      })
    );
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.userSubject.next(null);
    }
  }

  getToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser() {
    return this.userSubject.value;
  }

  register(user: UserCreate): Observable<User> {
    return this.generalService.postData('auth/register', user).pipe(
      tap((newUser) => {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('user', JSON.stringify(newUser));
          this.userSubject.next(newUser);
        }
      })
    );
  }
}
