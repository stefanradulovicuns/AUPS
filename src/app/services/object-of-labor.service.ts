import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../constants';
import { ObjectOfLabor } from '../models/objectOfLabor';

@Injectable({
  providedIn: 'root'
})
export class ObjectOfLaborService {

  constructor(private httpClient: HttpClient) { }

  getObjectOfLabors(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<ObjectOfLabor[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<ObjectOfLabor[]>(`${BACKEND_URL}ObjectOfLabor`, { params: queryParams });
  }

  getObjectOfLaborById(id: string): Observable<ObjectOfLabor> {
    return this.httpClient.get<ObjectOfLabor>(`${BACKEND_URL}ObjectOfLabor/${id}`);
  }

  createObjectOfLabor(objectOfLabor: ObjectOfLabor): Observable<ObjectOfLabor> {
    return this.httpClient.post<ObjectOfLabor>(`${BACKEND_URL}ObjectOfLabor`, objectOfLabor);
  }

  updateObjectOfLabor(objectOfLabor: ObjectOfLabor): Observable<ObjectOfLabor> {
    return this.httpClient.put<ObjectOfLabor>(`${BACKEND_URL}ObjectOfLabor`, objectOfLabor);
  }

  deleteObjectOfLabor(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}ObjectOfLabor/${id}`);
  }
}
