import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployees(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<Employee[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<Employee[]>(`${BACKEND_URL}Employee`, { params: queryParams, headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${BACKEND_URL}Employee/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${BACKEND_URL}Employee`, employee, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${BACKEND_URL}Employee`, employee, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }

  deleteEmployee(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}Employee/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } });
  }
}
