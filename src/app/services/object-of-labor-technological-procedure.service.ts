import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../constants';
import { Observable } from 'rxjs';
import { ObjectOfLaborTechnologicalProcedure } from '../models/objectOfLaborTechnologicalProcedure';

@Injectable({
  providedIn: 'root'
})
export class ObjectOfLaborTechnologicalProcedureService {

  constructor(private httpClient: HttpClient) { }

  getObjectOfLaborTechnologicalProcedures(search: string, sortBy: string, sortOrder: string, page: number, count: number, objectOfLaborId: string): Observable<ObjectOfLaborTechnologicalProcedure[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    queryParams = queryParams.append('objectOfLaborId', objectOfLaborId);
    return this.httpClient.get<ObjectOfLaborTechnologicalProcedure[]>(`${BACKEND_URL}ObjectOfLaborTechnologicalProcedure`, { params: queryParams });
  }

  getObjectOfLaborTechnologicalProcedureById(id: string): Observable<ObjectOfLaborTechnologicalProcedure> {
    return this.httpClient.get<ObjectOfLaborTechnologicalProcedure>(`${BACKEND_URL}ObjectOfLaborTechnologicalProcedure/${id}`);
  }

  createObjectOfLaborTechnologicalProcedure(objectOfLaborTechnologicalProcedure: ObjectOfLaborTechnologicalProcedure): Observable<ObjectOfLaborTechnologicalProcedure> {
    return this.httpClient.post<ObjectOfLaborTechnologicalProcedure>(`${BACKEND_URL}ObjectOfLaborTechnologicalProcedure`, objectOfLaborTechnologicalProcedure);
  }

  updateObjectOfLaborTechnologicalProcedure(objectOfLaborTechnologicalProcedure: ObjectOfLaborTechnologicalProcedure): Observable<ObjectOfLaborTechnologicalProcedure> {
    return this.httpClient.put<ObjectOfLaborTechnologicalProcedure>(`${BACKEND_URL}ObjectOfLaborTechnologicalProcedure`, objectOfLaborTechnologicalProcedure);
  }

  deleteObjectOfLaborTechnologicalProcedure(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}ObjectOfLaborTechnologicalProcedure/${id}`);
  }
}
