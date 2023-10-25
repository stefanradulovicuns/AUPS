import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export const roleGuard: CanActivateFn = (route, state) => {
  const expectedRole = route.data['expectedRole'];
  const accessToken = localStorage.getItem('accessToken');
  const jwtHelper = new JwtHelperService();

  if (accessToken) {
    const tokenPayload = jwtHelper.decodeToken(accessToken);
    const role = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (inject(AuthService).isAuthenticated() && role === expectedRole) {
      return true;
    }
    inject(Router).navigate(['login']);
  }
  return false;
};
