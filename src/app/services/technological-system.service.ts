import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TechnologicalSystem } from '../models/technologicalSystem';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class TechnologicalSystemService {

  constructor(private httpClient: HttpClient) { }

  getTechnologicalSystems(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<TechnologicalSystem[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<TechnologicalSystem[]>(`${BACKEND_URL}TechnologicalSystem`, { params: queryParams });
  }

  getTechnologicalSystemById(id: string): Observable<TechnologicalSystem> {
    return this.httpClient.get<TechnologicalSystem>(`${BACKEND_URL}TechnologicalSystem/${id}`);
  }

  createTechnologicalSystem(technologicalSystem: TechnologicalSystem): Observable<TechnologicalSystem> {
    return this.httpClient.post<TechnologicalSystem>(`${BACKEND_URL}TechnologicalSystem`, technologicalSystem);
  }

  updateTechnologicalSystem(technologicalSystem: TechnologicalSystem): Observable<TechnologicalSystem> {
    return this.httpClient.put<TechnologicalSystem>(`${BACKEND_URL}TechnologicalSystem`, technologicalSystem);
  }

  deleteTechnologicalSystem(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}TechnologicalSystem/${id}`);
  }
}
