import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectOfLaborMaterial } from '../models/objectOfLaborMaterial';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ObjectOfLaborMaterialService {

  constructor(private httpClient: HttpClient) { }

  getObjectOfLaborMaterials(search: string, sortBy: string, sortOrder: string, page: number, count: number, objectOfLaborId: string): Observable<ObjectOfLaborMaterial[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    queryParams = queryParams.append('objectOfLaborId', objectOfLaborId);
    return this.httpClient.get<ObjectOfLaborMaterial[]>(`${BACKEND_URL}ObjectOfLaborMaterial`, { params: queryParams });
  }

  getObjectOfLaborMaterialById(id: string): Observable<ObjectOfLaborMaterial> {
    return this.httpClient.get<ObjectOfLaborMaterial>(`${BACKEND_URL}ObjectOfLaborMaterial/${id}`);
  }

  createObjectOfLaborMaterial(objectOfLaborMaterial: ObjectOfLaborMaterial): Observable<ObjectOfLaborMaterial> {
    return this.httpClient.post<ObjectOfLaborMaterial>(`${BACKEND_URL}ObjectOfLaborMaterial`, objectOfLaborMaterial);
  }

  updateObjectOfLaborMaterial(objectOfLaborMaterial: ObjectOfLaborMaterial): Observable<ObjectOfLaborMaterial> {
    return this.httpClient.put<ObjectOfLaborMaterial>(`${BACKEND_URL}ObjectOfLaborMaterial`, objectOfLaborMaterial);
  }

  deleteObjectOfLaborMaterial(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}ObjectOfLaborMaterial/${id}`);
  }
}
