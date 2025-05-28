/*
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private authService: OAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.hasValidIdToken()) {
      return true;
    } else {
      // 💡 Stocke l’URL de destination avant de rediriger vers login
      localStorage.setItem('redirectUrlAfterLogin', state.url);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
  */