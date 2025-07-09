import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (): Observable<boolean> => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.verifyToken().pipe(
      switchMap((response) => {
        // If verifyToken fails, error handler in tap will handle redirect
        const user = auth.getCurrentUser();
        if (!user || !allowedRoles.includes(user.role)) {
          router.navigate(['/unauthorized']);
          return of(false);
        }
        return of(true);
      })
    );
  };
};
