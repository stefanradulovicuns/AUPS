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
}
