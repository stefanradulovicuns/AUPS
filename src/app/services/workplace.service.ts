import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workplace } from '../models/workplace';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {

  constructor(private httpClient: HttpClient) { }

  getWorkplaces(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<Workplace[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<Workplace[]>(`${BACKEND_URL}Workplace`, { params: queryParams });
  }

  getWorkplaceById(id: string): Observable<Workplace> {
    return this.httpClient.get<Workplace>(`${BACKEND_URL}Workplace/${id}`);
  }

  createWorkplace(workplace: Workplace): Observable<Workplace> {
    return this.httpClient.post<Workplace>(`${BACKEND_URL}Workplace`, workplace);
  }

  updateWorkplace(workplace: Workplace): Observable<Workplace> {
    return this.httpClient.put<Workplace>(`${BACKEND_URL}Workplace`, workplace);
  }

  deleteWorkplace(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}Workplace/${id}`);
  }
}
