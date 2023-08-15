import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../constants';
import { Warehouse } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private httpClient: HttpClient) { }

  getWarehouses(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<Warehouse[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<Warehouse[]>(`${BACKEND_URL}Warehouse`, { params: queryParams });
  }

  getWarehouseById(id: string): Observable<Warehouse> {
    return this.httpClient.get<Warehouse>(`${BACKEND_URL}Warehouse/${id}`);
  }

  createWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.httpClient.post<Warehouse>(`${BACKEND_URL}Warehouse`, warehouse);
  }

  updateWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.httpClient.put<Warehouse>(`${BACKEND_URL}Warehouse`, warehouse);
  }

  deleteWarehouse(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}Warehouse/${id}`);
  }
}
