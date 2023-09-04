import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.getToken();
  if (!token) return router.navigate(['/home']);
  return true;
};
