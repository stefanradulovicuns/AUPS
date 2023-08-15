import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TechnologicalProcedure } from '../models/technologicalProcedure';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TechnologicalProcedureService {

  constructor(private httpClient: HttpClient) { }

  getTechnologicalProcedures(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<TechnologicalProcedure[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<TechnologicalProcedure[]>(`${BACKEND_URL}TechnologicalProcedure`, { params: queryParams });
  }

  getTechnologicalProcedureById(id: string): Observable<TechnologicalProcedure> {
    return this.httpClient.get<TechnologicalProcedure>(`${BACKEND_URL}TechnologicalProcedure/${id}`);
  }

  createTechnologicalProcedure(technologicalProcedure: TechnologicalProcedure): Observable<TechnologicalProcedure> {
    return this.httpClient.post<TechnologicalProcedure>(`${BACKEND_URL}TechnologicalProcedure`, technologicalProcedure);
  }

  updateTechnologicalProcedure(technologicalProcedure: TechnologicalProcedure): Observable<TechnologicalProcedure> {
    return this.httpClient.put<TechnologicalProcedure>(`${BACKEND_URL}TechnologicalProcedure`, technologicalProcedure);
  }

  deleteTechnologicalProcedure(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}TechnologicalProcedure/${id}`);
  }
}
