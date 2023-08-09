import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${BACKEND_URL}Employee`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${BACKEND_URL}Employee`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}Employee/${id}`);
  }
}
