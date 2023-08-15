import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionOrder } from '../models/productionOrder';
import { BACKEND_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductionOrderService {

  constructor(private httpClient: HttpClient) { }

  getProductionOrders(search: string, sortBy: string, sortOrder: string, page: number, count: number): Observable<ProductionOrder[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('search', search);
    queryParams = queryParams.append('sortBy', sortBy);
    queryParams = queryParams.append('sortOrder', sortOrder);
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('count', count);
    return this.httpClient.get<ProductionOrder[]>(`${BACKEND_URL}ProductionOrder`, { params: queryParams });
  }

  getProductionOrderById(id: string): Observable<ProductionOrder> {
    return this.httpClient.get<ProductionOrder>(`${BACKEND_URL}ProductionOrder/${id}`);
  }

  createProductionOrder(productionOrder: ProductionOrder): Observable<ProductionOrder> {
    return this.httpClient.post<ProductionOrder>(`${BACKEND_URL}ProductionOrder`, productionOrder);
  }

  updateProductionOrder(productionOrder: ProductionOrder): Observable<ProductionOrder> {
    return this.httpClient.put<ProductionOrder>(`${BACKEND_URL}ProductionOrder`, productionOrder);
  }

  deleteProductionOrder(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${BACKEND_URL}ProductionOrder/${id}`);
  }
}
