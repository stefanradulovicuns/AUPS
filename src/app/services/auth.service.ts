import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../constants';
import { RegistrationRequest } from '../models/registrationRequest';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { LoginRequest } from '../models/loginRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(registrationRequest: RegistrationRequest): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${BACKEND_URL}Auth/register`, registrationRequest);
  }

  registerFirstUser(employee: Employee): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${BACKEND_URL}Auth/registerFirstUser`, employee);
  }

  login(loginRequest: LoginRequest): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(`${BACKEND_URL}Auth/login`, loginRequest);
  }

  logout(): Observable<any> {
    return this.httpClient.get<any>(`${BACKEND_URL}Auth/logout`);
  }

  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const jwtHelper = new JwtHelperService();
      return !jwtHelper.isTokenExpired(accessToken);
    }
    return false;
  }

  isInRole(expectedRoles: string[]): boolean {
    if (expectedRoles && expectedRoles.length > 0) {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        const jwtHelper = new JwtHelperService();
        const tokenPayload = jwtHelper.decodeToken(accessToken);

        const role = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        const hasMatchingRole = expectedRoles.some(expectedRole => {
          return this.isAuthenticated() && role === expectedRole;
        });
        if (hasMatchingRole) {
          return true;
        }
      }
    }
    return false;
  }

  isCurrentUserEmail(email: string) {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const jwtHelper = new JwtHelperService();
      const tokenPayload = jwtHelper.decodeToken(accessToken);

      const currentUserEmail = tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return currentUserEmail === email;
    }
    return false;
  }

  isInOrganizationalUnit(organizationalUnitId: string | null) {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && organizationalUnitId) {
      const jwtHelper = new JwtHelperService();
      const tokenPayload = jwtHelper.decodeToken(accessToken);

      const organizationalUnitId = tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return organizationalUnitId === organizationalUnitId;
    }
    return false;
  }
}
