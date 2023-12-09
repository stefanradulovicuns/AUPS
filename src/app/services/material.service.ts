import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../models/material';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private httpClient: HttpClient) { }

  getMaterials(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<Material[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<Material[]>(`${BACKEND_URL}Material`, { params: queryParams });
  }

  getMaterialById(id: string): Observable<Material> {
    return this.httpClient.get<Material>(`${BACKEND_URL}Material/${id}`);
  }

  createMaterial(material: Material): Observable<Material> {
    return this.httpClient.post<Material>(`${BACKEND_URL}Material`, material);
  }

  updateMaterial(material: Material): Observable<Material> {
    return this.httpClient.put<Material>(`${BACKEND_URL}Material`, material);
  }

  deleteMaterial(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}Material/${id}`);
  }
}