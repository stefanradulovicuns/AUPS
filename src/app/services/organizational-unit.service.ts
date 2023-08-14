import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../constants';
import { Observable } from 'rxjs';
import { OrganizationalUnit } from '../models/organizationalUnit';

@Injectable({
  providedIn: 'root'
})
export class OrganizationalUnitService {

  constructor(private httpClient: HttpClient) { }

  getOrganizationalUnits(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<OrganizationalUnit[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<OrganizationalUnit[]>(`${BACKEND_URL}OrganizationalUnit`, { params: queryParams });
  }

  getOrganizationalUnitById(id: string): Observable<OrganizationalUnit> {
    return this.httpClient.get<OrganizationalUnit>(`${BACKEND_URL}OrganizationalUnit/${id}`);
  }

  createOrganizationalUnit(organizationalUnit: OrganizationalUnit): Observable<OrganizationalUnit> {
    return this.httpClient.post<OrganizationalUnit>(`${BACKEND_URL}OrganizationalUnit`, organizationalUnit);
  }

  updateOrganizationalUnit(organizationalUnit: OrganizationalUnit): Observable<OrganizationalUnit> {
    return this.httpClient.put<OrganizationalUnit>(`${BACKEND_URL}OrganizationalUnit`, organizationalUnit);
  }

  deleteOrganizationalUnit(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}OrganizationalUnit/${id}`);
  }
}
