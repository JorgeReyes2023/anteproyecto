import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.getCurrentUser();

    console.log('Current user:', user);

    if (!user || !allowedRoles.includes(user.role)) {
      router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  };
};
