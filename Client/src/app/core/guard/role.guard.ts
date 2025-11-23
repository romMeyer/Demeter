import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../enum/Role';
import { AuthService } from '../../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as Role[];
  const currentRole = auth['currentUserSubject'].getValue();  // 👈 Utilise ton BehaviorSubject

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  if (!expectedRoles.includes(currentRole)) {
    router.navigate(['/catalogue']);    // Page 403 par exemple
    return false;
  }

  return true;
};
